'use strict';
const router = require('express').Router();
const cont = require('../controllers/personController.js');

router.get('/person', cont.getPeople);
router.post('/person', cont.createAndUpdatePerson);
router.delete('/person', cont.removePerson);

module.exports = {
    routes: router
};
