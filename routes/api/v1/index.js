const express = require('express');
const router = express.Router();

const postApi = require('../../../controllers/api/v1/posts_api');

router.get('/posts', postApi.posts);
router.delete('/delete/:id', postApi.deletePost);

module.exports = router;