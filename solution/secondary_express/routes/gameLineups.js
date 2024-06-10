const express = require('express');
const router = express.Router();
const gameLineupsController = require('../controllers/gameLineupsController');


router.post('/lineupbygameid', gameLineupsController.getGameLineupsByGameId);

module.exports = router;
