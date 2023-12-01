const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teams');

router.get('/', teamController.index);
router.get('/:id', teamController.show);
router.get('/new', teamController.new);
router.post('/', teamController.create);
router.delete('/:id', teamController.delete);

module.exports = router;


