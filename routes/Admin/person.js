'use strict';
const { isAdmin, isAdminOrCanUpload} = require("../../middleware/admin/isAuth");
const ash = require('express-async-handler');
const express = require('express');
const router = express.Router();
const personController  = require('../../controllers/personController');
const {mapFieldsToBody} = require("../../middleware/mapFieldsToBody");
const { body } = require("express-validator/check");

router.get('/people', isAdminOrCanUpload, ash(personController.getPeople));

router.post('/person', isAdminOrCanUpload, mapFieldsToBody, ash(personController.createAndUpdatePerson));

router.get('/person/:id', isAdminOrCanUpload, ash(personController.getPersonById));

router.delete('/person/:id', isAdmin, ash(personController.removePerson));

module.exports = router;
