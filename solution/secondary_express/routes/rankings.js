const express = require('express');
const router = express.Router();
const rankingsController = require('../controllers/rankingsController');

router.post('/getrankings', rankingsController.getRankings);

module.exports = router;
