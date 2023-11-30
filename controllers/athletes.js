const Athlete = require('../models/athlete');
const Team = require('../models/team');

module.exports = {
  async delete(req, res) {
    try {
      const athlete = await Athlete.findByIdAndDelete(req.params.id);
      
      if (athlete && athlete.team) {
        await Team.findByIdAndUpdate(
          athlete.team,
          { $pull: { athletes: athlete._id } }, ///////////
          { new: true }
        );
      }

      res.redirect("/athletes");
    } catch (err) {
      console.error(err);
      res.redirect("/athletes");
    }
  },

  async index(req, res) {
    try {
      const athletes = await Athlete.find({});
      res.render('athletes/index', { athletes });
    } catch (err) {
      console.error(err);
      res.render('athletes/index', { athletes: [] });
    }
  },

  async show(req, res) {
    try {
      const athlete = await Athlete.findById(req.params.id);
      const teams = await Team.find({ athletes: athlete._id });
      res.render('athletes/show', { title: 'Athlete Details', athlete, teams });
    } catch (err) {
      console.error(err);
      res.redirect("/athletes");
    }
  },

  async create(req, res) {
    try {
      const teams = await Team.find({}); // Fetch the list of teams
      const athlete = new Athlete(req.body);
      await athlete.save();
      res.redirect('/athletes');
    } catch (err) {
      console.error(err);
      res.render('athletes/new', { teams }); // Pass the teams variable to the view
    }
  },

  new(req, res) {
    res.render('athletes/new');
  }
};