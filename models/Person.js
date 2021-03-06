//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const schema = mongoose.Schema;

const personSchema = new schema({
  name: { type : String, required: true, trim: true},
  birth: { type : Date, required: true, trim: true},
  birthplace: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  death: { type : Date, min: this.birth, required: true, trim: true},
  deathPlace: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  nationality:  { type: mongoose.Schema.Types.ObjectId, ref: 'Nationality' },
  occupation:  [{ type: String, trim: true }],
  causeOfDeath: { type: String, trim: true },
  url: { type : String, required: false, trim: true},
  image: [{ type : String, required: false }],
  createdBy:{ type: schema.Types.ObjectId, ref: 'User'},
},  { timestamps: true });
personSchema.index({ name:1 }, { 
  unique: true })
// Compile model from schema
module.exports =  mongoose.model('Person', personSchema);
