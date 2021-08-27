'use strict';
require('dotenv').config()
const express = require("express");
const path = require('path');
const cors = require('cors');
const morgan = require('morgan')
const fileRoutes = require('./routes/fileUploadRoutes');
const authRoutes = require('./routes/authRoutes');
const personRoutes = require('./routes/personRoutes');
const router = require('./router.js');
const formidable = require('express-formidable');
const {mapFieldsToBody} = require("./middleware/mapFieldsToBody");
const { handleError, ErrorHandler } = require('./helpers/errors');
const seeds = require('./Seeds/Seeds')
const app = express();
app.use(cors());
app.use(formidable());
app.use(mapFieldsToBody)
require('./database')();

app.use(morgan("tiny"))

app.use('/api/auth', authRoutes);
app.use('/api/admin', router.admin.auth, router.admin.user, router.admin.person);
app.use('/api/general', router.general.routes);

//error handle middleware
app.get('/healthcheck', (req, res) => {
    res.status(200).send("hello")
})

app.get('/api/error', (req, res) => {
    throw new ErrorHandler(500, 'Internal server error');
})
app.use((err, req, res, next) => {
    handleError(err, res);
});
app.use('*', (req, res) => {
    res.status(404).send("not found")
});

for (const seed of seeds) {
    const asyncCall = async ()=>{
        await seed();
    }
    asyncCall()
}

// log your server is running and the port
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`Click here to open: http://localhost:${port}`)
});
