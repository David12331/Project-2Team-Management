const Athlete = require('../models/athlete');
const Team = require('../models/team');

module.exports = {
  index,
  show,
  new: newAthlete,
  create,
  delete: deleteAthlete
};

function deleteAthlete(req, res) {
  Athlete.findByIdAndDelete(req.params.id, function(err, athlete) {
    if (err) {
      console.error(err);
      res.redirect("/athletes");
    } else {
      // If the athlete was associated with a team, remove the athlete from the team
      if (athlete.team) {
        Team.findByIdAndUpdate(
          athlete.team,
          { $pull: { athletes: athlete._id } },
          { new: true },
          function(err, updatedTeam) {
            if (err) {
              console.error(err);
            }
            res.redirect("/athletes");
          }
        );
      } else {
        res.redirect("/athletes");
      }
    }
  });
}

function index(req, res) {
  Athlete.find({}, function(err, athletes) {
    if (err) {
      console.error(err);
      res.render('athletes/index', { athletes: [] });
    } else {
      res.render('athletes/index', { athletes });
    }
  });
}

function show(req, res) {
  Athlete.findById(req.params.id, function(err, athlete) {
    if (err) {
      console.error(err);
      res.redirect("/athletes");
    } else {
      Team.find({ athletes: athlete._id }, function(err, teams) {
        if (err) {
          console.error(err);
          res.redirect("/athletes");
        } else {
          res.render('athletes/show', { title: 'Athlete Details', athlete, teams });
        }
      });
    }
  });
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key].length < 2) delete req.body[key];
  }

  const athlete = new Athlete(req.body);

  athlete.save(function(err) {
    if (err) {
      console.error(err);
      res.render('athletes/new');
    } else {
      res.redirect('/athletes');
    }
  });
}

function newAthlete(req, res) {
  res.render('athletes/new');
}