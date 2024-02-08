//require express
const express = require('express');
//create router instance
const router = express.Router();

//require controller
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

module.exports = router;