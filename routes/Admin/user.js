'use strict';
const { isAdmin } = require("../../middleware/admin/isAuth");

const express = require('express');
const router = express.Router();
const ash = require('express-async-handler');

const userController = require('../../controllers/userController');

router.get('/user/:id', isAdmin, ash(userController.user));

router.get('/users', isAdmin, ash(userController.users));

router.get('/users', isAdmin, ash(userController.users));

router.get('/changerole', isAdmin, ash(userController.changeRole));

router.get('/canUpload', isAdmin, ash(userController.canUpload));

router.get('/userProfile', isAdmin, ash(userController.userProfile));

router.get('/suspend', isAdmin, ash(userController.suspendUser));

module.exports = router;
