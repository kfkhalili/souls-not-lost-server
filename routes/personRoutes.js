'use strict';
const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
const Person = require('../models/Person')
const cont = require('../controllers/personController.js');

router.get('/person', cont.getPeople);
router.post('/person', cont.createAndUpdatePerson);
router.delete('/person', cont.removePerson);

module.exports = {
    routes: router
};
