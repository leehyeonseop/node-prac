const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const authRouter = require('./routes/auth');
const indexRouter = require('./routes');
const v1Router = require('./routes/v1');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 8002);
app.set('view engine', 'html');
nunjucks.configure('views', {  
    express : app,
    watch : true
});
sequelize.sync({ force : false })
    .then(() => {
        console.log('데이터베이스 연결 성공')
    })
    .catch((err) => {
        console.error(err)
    })

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // req.body를 ajax json 요청으로부터
app.use(express.urlencoded({ extended : false })); // req.body 폼으로부터
app.use(cookieParser(process.env.COOKIE_SECRET)); // { connect.sid : 12415432554123 }
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false
    }
}));
app.use(passport.initialize()); // 여기에서 이런것들 생김 req.user, req.login, req.isAuthenticate, req.logout
// passport를 연결할 때 생김. passport가 로그인을 위해서 필요한것들을 자동으로 생성해줌
app.use(passport.session()); // connect.sid 라는 이름으로 세션 쿠키가 브라우저로 전송
// 브라우저 connect.sid=12415432554123

app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/v1', v1Router);

app.use((req, res, next) => { // 404 NOT FOUND
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 에러 로그를 서비스한테 넘김.
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});




