const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teams');


router.get('/teams', teamController.index);
router.get('/teams/:id', teamController.show);
router.get('/teams/new', teamController.new);
router.post('/teams', teamController.create);
router.delete('/teams/:id', teamController.delete);

module.exports = router;