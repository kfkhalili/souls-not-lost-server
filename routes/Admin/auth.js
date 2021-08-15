'use strict';
const express = require('express');
const router = express.Router();

const authController = require('../../controllers/authController.js');
const ash = require('express-async-handler');

router.post('/login', ash(authController.login));

module.exports = router;
