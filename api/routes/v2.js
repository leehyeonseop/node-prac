const express = require('express');
const { verifyToken, apiLimiter, corsWhenDomainMatches } = require('../middlewares');
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v2');
const cors = require('cors');

const router = express.Router();

// router.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
//     res.setHeader('Access-Control-Allow-Headers', 'content-type')
//     next();
// })

router.use(corsWhenDomainMatches);

// /v1/token
router.post('/token', apiLimiter, createToken); // req.body.clientSecret
router.get('/test', verifyToken, apiLimiter, tokenTest)

router.get('/posts/my', verifyToken, apiLimiter, getMyPosts);
router.get('/posts/hashtag/:title', verifyToken, apiLimiter, getPostsByHashtag)

module.exports = router;