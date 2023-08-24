const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({});
        console.log('실행1')
        console.log(users)
        res.render('mongoose', { users });
        console.log('실행2')
    } catch (err) {
        console.log('에러발생')
        console.error(err);
        next(arr)
    }
})

module.exports = router;