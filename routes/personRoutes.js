'use strict';
const {
    createAndUpdatePersonValidator,
    removePersonValidator,
    getPeopleValidator
} = require("../models/validators/validators");
const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const Person = require('../models/Person')
const cont = require('../controllers/personController.js');

router.get('/person', getPeopleValidator, cont.getPeople);
router.post('/person', createAndUpdatePersonValidator, cont.createAndUpdatePerson);
router.delete('/person', removePersonValidator, cont.removePerson);

module.exports = {
    routes: router
};
