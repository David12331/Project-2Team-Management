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

// Team schema
const teamSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  athletes: [{ type: Schema.Types.ObjectId, ref: 'Athlete' }], // Reference to Athlete model
}, {
  timestamps: true
});

// Compile the schemas into models and export them
const Athlete = mongoose.model('Athlete', athleteSchema);
const Team = mongoose.model('Team', teamSchema);

module.exports = { Athlete, Team };