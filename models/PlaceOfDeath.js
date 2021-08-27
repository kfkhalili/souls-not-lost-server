//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const placeOfDeathSchema = new Schema({
  name: { type : String, required: true, trim: true},
  nameAr: { type : String, required: true, trim: true},
});

// Compile model from schema
module.exports =  mongoose.model('PlaceOfDeath', placeOfDeathSchema);
