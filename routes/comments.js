const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comments_controller');
const passport = require('passport');

router.post('/create', passport.checkAuthentication, commentController.createComments);
router.get('/destroy/:id', passport.checkAuthentication, commentController.destroyComment);
module.exports = router;