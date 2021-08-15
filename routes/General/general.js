'use strict';
const router = require('express').Router();

router.get('/nationalities', (req, res)=>{
    res.send({ data:require("./nationalities.json") });
});

module.exports = {
    routes: router
};
