
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teams');

router.get('/', teamController.index);
router.get('/new', teamController.newForm); // Adjust the route name for displaying the form
router.post('/', teamController.create);    // Use a POST request for form submission
router.get('/:id', teamController.show);
router.delete('/:id', teamController.delete);

module.exports = router;









/* const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teams');

router.get('/', teamController.index);
router.get('/:id', teamController.show);
router.get('/new', teamController.new);
router.post('/new', teamController.create);
router.delete('/:id', teamController.delete);

module.exports = router; */


