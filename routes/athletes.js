const express = require('express');
const router = express.Router();
const athleteController = require('../controllers/athletes');


router.get('/', athleteController.index);
router.get('/new', athleteController.new);
router.get('/:id', athleteController.show);
router.post('/', athleteController.create);
router.delete('/:id', athleteController.delete);
router.get('/:id/edit', athleteController.editForm);

//// router.post('/:id/edit', athleteController.update); ///////

module.exports = router;