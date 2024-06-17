const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');

router.post('/careerbyplayerid', careerController.getCareerById);

module.exports = router;
