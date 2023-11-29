const Team = require('../models/team');
const Athlete = require('../models/athlete');

module.exports = {
  index,
  show,
  new: newTeam,
  create,
  delete: deleteTeam
};

function index(req, res) {
  Team.find({}, function(err, teams) {
    if (err) {
      console.error(err);
      res.render('teams/index', { teams: [] });
    } else {
      res.render('teams/index', { teams });
    }
  });
}

function show(req, res) {
  Team.findById(req.params.id)
    .populate('athletes')
    .exec(function(err, team) {
      if (err) {
        console.error(err);
        res.redirect("/teams");
      } else {
        res.render('teams/show', { title: 'Team Details', team });
      }
    });
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key].length < 2) delete req.body[key];
  }

  const team = new Team(req.body);

  team.save(function(err, savedTeam) {
    if (err) {
      console.error(err);
      res.render('teams/new');
    } else {
      res.redirect('/teams');
    }
  });
}

function newTeam(req, res) {
  res.render('teams/new');
}

function deleteTeam(req, res) {
  Team.findByIdAndDelete(req.params.id, function(err, deletedTeam) {
    if (err) {
      console.error(err);
      res.redirect("/teams");
    } else {
      // Remove the team reference from all associated athletes
      Athlete.updateMany(
        { team: deletedTeam._id },
        { $unset: { team: 1 } },
        function(err) {
          if (err) {
            console.error(err);
          }
          res.redirect("/teams");
        }
      );
    }
  });
}