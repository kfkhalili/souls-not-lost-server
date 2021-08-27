//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const causeOfDeathSchema = new Schema({
  name: { type : String, required: true, trim: true},
  nameAr: { type : String, required: true, trim: true},
});

// Compile model from schema
module.exports =  mongoose.model('CauseOfDeath', causeOfDeathSchema);
