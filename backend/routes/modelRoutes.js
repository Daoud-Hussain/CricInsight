const express = require('express');
const { executeModel } = require('../controllers/modelController');
const router = express.Router();

// Route for executing the model
router.post('/execute', executeModel);

module.exports = router;
