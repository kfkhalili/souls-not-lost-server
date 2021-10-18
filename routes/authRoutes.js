const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const ash = require("express-async-handler");

router.post('/register', ash(authController.register));

router.post('/login', ash(authController.login));

router.get('/confirm/:confirmationCode', ash(authController.verifyUser));

router.post('/forgot-password', ash(authController.sendResetPasswordRequest));

router.post('/resetpassword', ash(authController.resetPassword));

module.exports = router;
