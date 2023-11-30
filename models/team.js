const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  athletes: [{ type: Schema.Types.ObjectId, ref: 'Athlete' }],
}, {

});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;