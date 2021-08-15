'use strict';
require('dotenv').config()
const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
        })
    }catch (err) {
       console.log(err)
    }
}


