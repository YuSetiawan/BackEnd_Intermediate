const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const {protect} = require('../middleware/auth');

router
  .post('/register', userController.registerUser)
  .post('/login', userController.loginUser)
  // need to login first to see profile
  .get('/profile', protect, userController.profileUser)
  .post('/refreshToken', userController.refreshToken);

module.exports = router;
