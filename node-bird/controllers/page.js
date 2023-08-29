exports.renderProfile = (req, res, next) => {
    res.render('profile', { title : '내 정보 - NodeBird' })
};

exports.renderJoin = (req, res, next) => {
    res.render('join', { title: '회원가입 - NodeBird' })
};

exports.renderMain = (req, res, next) => {
    const twits = [];
    res.render('main', {
        title: 'NodeBird',
        twits,
    });
}