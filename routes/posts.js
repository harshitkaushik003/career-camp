const express = require('express');
const router = express.Router();

const postController = require('../controllers/post_controller');
const passport = require('passport');
router.post('/create',passport.checkAuthentication, postController.createPost);
router.get("/destroy/:id", passport.checkAuthentication, postController.destroyPost);
module.exports = router;