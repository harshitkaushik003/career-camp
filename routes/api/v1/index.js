const express = require('express');
const router = express.Router();

const postApi = require('../../../controllers/api/v1/posts_api');
const passport = require('passport');

router.get('/posts', postApi.posts);
router.delete('/delete/:id',passport.authenticate('jwt', {session: false}), postApi.deletePost);
router.use('/users', require('./users'));

module.exports = router;