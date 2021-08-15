//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const occupationSchema = new Schema({
  title: { type : String, required: true, trim: true},
});

// Compile model from schema
module.exports =  mongoose.model('Occupation', occupationSchema);