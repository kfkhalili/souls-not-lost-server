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
  occupation: { type: mongoose.Schema.Types.ObjectId, ref: 'Nationality' },
  causeOfDeath: { type: mongoose.Schema.Types.ObjectId, ref: 'CauseOfDeath' },
  url: { type : String, required: true, trim: true},
  image: [{ type : Buffer, required: true }],
  createdBy:{ type: schema.Types.ObjectId, ref: 'user'},
});
personSchema.index({ name:1 }, { unique: true })
// Compile model from schema
module.exports =  mongoose.model('Person', personSchema);
