const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Athlete schema
const athleteSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 18 },
  position: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true }, // Reference to Team model
}, {
  timestamps: true
});





// Compile the schemas into models and export them
const Athlete = mongoose.model('Athlete', athleteSchema);

module.exports = Athlete;