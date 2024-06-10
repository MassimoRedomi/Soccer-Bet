const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');

// POST request to get games by competition_id
router.post('/games_by_competition', gamesController.getGamesByCompetitionId);

// POST request to get games by competition_id and season
router.post('/games_by_competitionNseason', gamesController.getGamesByCompetitionAndSeason);

// POST request to get unique seasons by competition_id
router.post('/seasons_by_competition', gamesController.getSeasonsByCompetitionId);

router.post('/getgame-by-id', gamesController.getGameByGameId);
module.exports = router;

