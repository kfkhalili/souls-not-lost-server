'use strict';
const router = require('express').Router();
const Nationality = require("../../models/Nationality");
const Occupation = require("../../models/Occupation");
const CauseOfDeath = require("../../models/CauseOfDeath");
const Place = require("../../models/Place");

router.get('/nationalities', async (req, res)=>{
    const result = await Nationality.find({});
    res.send({ data: result });
});

router.get('/occupations', async (req, res)=>{
    const result = await Occupation.find({});
    res.send({ data: result });
});


router.get('/causeofdeath', async (req, res)=>{
    const result = await CauseOfDeath.find({});
    res.send({ data: result });
});

router.get('/placeofdeath', async (req, res)=>{
    const result = await Place.find({});
    res.send({ data: result });
});

router.get('/placeofbirth', async (req, res)=>{
    const result = await Place.find({});
    res.send({ data: result });
});

module.exports = {
    routes: router
};
