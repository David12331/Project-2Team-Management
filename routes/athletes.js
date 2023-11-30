const express = require('express');
const router = express.Router();
const athleteController = require('../controllers/athletes');


router.get('/', athleteController.index);
router.get('/new', athleteController.new);
router.get('/:id', athleteController.show);
router.post('/', athleteController.create);
router.delete('/:id', athleteController.delete);

module.exports = router;