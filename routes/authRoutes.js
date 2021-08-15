const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/confirm/:confirmationCode', authController.verifyUser);

module.exports = router;
