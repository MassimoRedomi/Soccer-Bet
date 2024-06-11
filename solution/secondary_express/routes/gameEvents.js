const express = require('express');
const router = express.Router();
const gameEventsController = require('../controllers/gameEventsController');

router.post('/getgamevents-by-id', gameEventsController.getGameEventsByGameId);

module.exports = router;
