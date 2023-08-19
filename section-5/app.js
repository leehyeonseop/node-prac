const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(__dirname, 'public-3030'))
app.use(cookieParser('hyeonseopPassword'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(session());



app.use((req, res, next) => {
    console.log('1 모든 요청에 실행하고 싶어요.')
    next();
})

app.get('/', (req, res, next) => {
    req.body.name
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    // console.log('모든 요청에 실행하고 싶어요.')
    res.send('hello express');
});


app.get('/category/Javascript', (req, res) => {
    res.send('헬로 자바스크립트')
})

app.get('/category/:name', (req, res) => {
    res.send(`hello ${req.params.name}`)
})

app.get('/about', (req, res) => {
    // console.log('모든 요청에 실행하고 싶어요.')
    res.send('hello express')
})

// app.get('*', (req, res) => {
//     res.send('모든 요청 실행')
// })

// 404 처리
app.use((req, res, next) => {
    res.status(404).send('404지롱')
})

// 에러 미들웨어는 반드시 4개를 전부 넣어줘야함 ! (중요)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(200).send('에러 났지롱. 근데 안 알려주지롱.')
})

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 만들기')
})