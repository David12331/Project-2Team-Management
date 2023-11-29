const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  athletes: [{ type: Schema.Types.ObjectId, ref: 'Athlete' }],
}, {
  timestamps: true
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;