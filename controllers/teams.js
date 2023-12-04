const Team = require('../models/team');
const Athlete = require('../models/athlete');

module.exports = {
  async delete(req, res) {
    try {
      const deletedTeam = await Team.findByIdAndDelete(req.params.id);

      if (deletedTeam) {
        await Athlete.updateMany(
          { team: deletedTeam._id },
          { $unset: { team: 1 } }
        );
      }

      res.redirect("/teams");
    } catch (err) {
      console.error(err);
      res.redirect("/teams");
    }
  },
  

  async index(req, res) {
    try {

      const teams = await Team.find({});
      res.render('teams/index', { teams });
    } catch (err) {
      console.error(err);
      res.render('teams/index', { teams: [] });
    }
  },


    async show(req, res) {
      try {
        const team = await Team.findById(req.params.id).populate('athletes');
        res.render('teams/show', { title: 'Team Details', team });
      } catch (err) {
        console.error(err);
        res.redirect("/teams");
      }
    },


  async create(req, res) {
    try {
      
      const team = new Team(req.body);
      await team.save();
      console.log('new Team created; newTeam')
      res.redirect('/teams');
    } catch (err) {
      console.error(err);
      res.render('teams/new');
    }
  },

  newForm(req, res) {
    res.render('teams/new');
  }
};