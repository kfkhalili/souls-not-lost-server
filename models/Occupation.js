//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const schema = new mongoose.Schema({
  name: { type : String, required: true, trim: true},
  nameAr: { type : String, required: true, trim: true},
});

// Compile model from schema
module.exports =  mongoose.model('Occupation', schema);
