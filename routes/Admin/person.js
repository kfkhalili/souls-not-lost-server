'use strict';
const {createAndUpdatePersonValidator} = require( "../../models/validators/validators");

const { isAdmin } = require("../../middleware/admin/isAuth");
const ash = require('express-async-handler');
const express = require('express');
const router = express.Router();
const personController  = require('../../controllers/personController');
const {mapFieldsToBody} = require("../../middleware/mapFieldsToBody");
const { body } = require("express-validator/check");

router.get('/people', isAdmin, ash(personController.getPeople));

router.post('/person', isAdmin, mapFieldsToBody, body("testtest").exists().isFloat(), createAndUpdatePersonValidator, ash(personController.createAndUpdatePerson));

module.exports = router;
