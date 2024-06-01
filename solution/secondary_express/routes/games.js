const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');


/**
 * @swagger
 * /api/games_by_competition:
 *   post:
 *     summary: Retrieve games by competition ID
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               competition_id:
 *                 type: string
 *                 description: The ID of the competition
 *             example:
 *               competition_id: "BE1"
 *     responses:
 *       200:
 *         description: A list of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The auto-generated ID of the game
 *                   game_id:
 *                     type: integer
 *                     description: The ID of the game
 *                   competition_id:
 *                     type: string
 *                     description: The ID of the competition
 *                   season:
 *                     type: integer
 *                     description: The season year
 *                   round:
 *                     type: string
 *                     description: The round of the match
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date of the game
 *                   home_club_id:
 *                     type: integer
 *                     description: The ID of the home club
 *                   away_club_id:
 *                     type: integer
 *                     description: The ID of the away club
 *                   home_club_goals:
 *                     type: integer
 *                     description: The number of goals scored by the home club
 *                   away_club_goals:
 *                     type: integer
 *                     description: The number of goals scored by the away club
 *                   home_club_position:
 *                     type: integer
 *                     description: The position of the home club
 *                   away_club_position:
 *                     type: integer
 *                     description: The position of the away club
 *                   home_club_manager_name:
 *                     type: string
 *                     description: The name of the home club manager
 *                   away_club_manager_name:
 *                     type: string
 *                     description: The name of the away club manager
 *                   stadium:
 *                     type: string
 *                     description: The name of the stadium
 *                   referee:
 *                     type: string
 *                     description: The referee of the game
 *                   url:
 *                     type: string
 *                     description: The URL to the game details
 *                   home_club_name:
 *                     type: string
 *                     description: The name of the home club
 *                   away_club_name:
 *                     type: string
 *                     description: The name of the away club
 *                   aggregate:
 *                     type: string
 *                     description: The aggregate score
 *                   competition_type:
 *                     type: string
 *                     description: The type of the competition
 *                   competition_name:
 *                     type: string
 *                     description: The name of the competition
 *       404:
 *         description: No games found for this competition ID
 */
router.post('/games_by_competition', gamesController.getGamesByCompetitionId);



/**
 * @swagger
 * /api/games_by_competitionNseason:
 *   post:
 *     summary: Retrieve games by competition ID and season
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               competition_id:
 *                 type: string
 *                 description: The ID of the competition
 *               season:
 *                 type: integer
 *                 description: The season year
 *             example:
 *               competition_id: "BE1"
 *               season: 2012
 *     responses:
 *       200:
 *         description: A list of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The auto-generated ID of the game
 *                   game_id:
 *                     type: integer
 *                     description: The ID of the game
 *                   competition_id:
 *                     type: string
 *                     description: The ID of the competition
 *                   season:
 *                     type: integer
 *                     description: The season year
 *                   round:
 *                     type: string
 *                     description: The round of the match
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date of the game
 *                   home_club_id:
 *                     type: integer
 *                     description: The ID of the home club
 *                   away_club_id:
 *                     type: integer
 *                     description: The ID of the away club
 *                   home_club_goals:
 *                     type: integer
 *                     description: The number of goals scored by the home club
 *                   away_club_goals:
 *                     type: integer
 *                     description: The number of goals scored by the away club
 *                   home_club_position:
 *                     type: integer
 *                     description: The position of the home club
 *                   away_club_position:
 *                     type: integer
 *                     description: The position of the away club
 *                   home_club_manager_name:
 *                     type: string
 *                     description: The name of the home club manager
 *                   away_club_manager_name:
 *                     type: string
 *                     description: The name of the away club manager
 *                   stadium:
 *                     type: string
 *                     description: The name of the stadium
 *                   attendance:
 *                     type: integer
 *                     description: The attendance of the game
 *                   referee:
 *                     type: string
 *                     description: The referee of the game
 *                   url:
 *                     type: string
 *                     description: The URL to the game details
 *                   home_club_name:
 *                     type: string
 *                     description: The name of the home club
 *                   away_club_name:
 *                     type: string
 *                     description: The name of the away club
 *                   aggregate:
 *                     type: string
 *                     description: The aggregate score
 *                   competition_type:
 *                     type: string
 *                     description: The type of the competition
 *                   competition_name:
 *                     type: string
 *                     description: The name of the competition
 *       404:
 *         description: No games found for this competition ID and season
 */
router.post('/games_by_competitionNseason', gamesController.getGamesByCompetitionAndSeason);



/**
 * @swagger
 * /api/seasons_by_competition:
 *   post:
 *     summary: Retrieve unique seasons by competition ID
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               competition_id:
 *                 type: string
 *                 description: The ID of the competition
 *             example:
 *               competition_id: "BE1"
 *     responses:
 *       200:
 *         description: A list of unique seasons by competition ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   competition_id:
 *                     type: string
 *                     description: The ID of the competition
 *                   season:
 *                     type: integer
 *                     description: The season year
 *                   competition_name:
 *                     type: string
 *                     description: The name of the competition
 *               example:
 *                 competition_id: "BE1"
 *                 season: 2023
 *                 competition_name: "jupiler-pro-league"
 *       404:
 *         description: No seasons found for this competition ID
 */
router.post('/seasons_by_competition', gamesController.getSeasonsByCompetitionId);



/**
 * @swagger
 * /api/getgame-by-id:
 *   post:
 *     summary: Retrieve a game by game ID
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               game_id:
 *                 type: string
 *                 description: The ID of the game
 *             example:
 *               game_id: "2222597"
 *     responses:
 *       200:
 *         description: A game matching the provided game ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The auto-generated ID of the game
 *                 game_id:
 *                   type: integer
 *                   description: The ID of the game
 *                 competition_id:
 *                   type: string
 *                   description: The ID of the competition
 *                 season:
 *                   type: integer
 *                   description: The season year
 *                 round:
 *                   type: string
 *                   description: The round of the match
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: The date of the game
 *                 home_club_id:
 *                   type: integer
 *                   description: The ID of the home club
 *                 away_club_id:
 *                   type: integer
 *                   description: The ID of the away club
 *                 home_club_goals:
 *                   type: integer
 *                   description: The number of goals scored by the home club
 *                 away_club_goals:
 *                   type: integer
 *                   description: The number of goals scored by the away club
 *                 home_club_position:
 *                   type: integer
 *                   description: The position of the home club
 *                 away_club_position:
 *                   type: integer
 *                   description: The position of the away club
 *                 home_club_manager_name:
 *                   type: string
 *                   description: The name of the home club manager
 *                 away_club_manager_name:
 *                   type: string
 *                   description: The name of the away club manager
 *                 stadium:
 *                   type: string
 *                   description: The name of the stadium
 *                 attendance:
 *                   type: integer
 *                   description: The attendance of the game
 *                 referee:
 *                   type: string
 *                   description: The referee of the game
 *                 url:
 *                   type: string
 *                   description: The URL to the game details
 *                 home_club_name:
 *                   type: string
 *                   description: The name of the home club
 *                 away_club_name:
 *                   type: string
 *                   description: The name of the away club
 *                 aggregate:
 *                   type: string
 *                   description: The aggregate score
 *                 competition_type:
 *                   type: string
 *                   description: The type of the competition
 *                 competition_name:
 *                   type: string
 *                   description: The name of the competition
 *               example:
 *                 _id: "666ac837a35c99dfed759249"
 *                 game_id: 2222597
 *                 competition_id: "RU1"
 *                 season: 2012
 *                 round: "6. Matchday"
 *                 date: "2012-08-24T22:00:00.000Z"
 *                 home_club_id: 3725
 *                 away_club_id: 232
 *                 home_club_goals: 2
 *                 away_club_goals: 1
 *                 home_club_position: 2
 *                 away_club_position: 5
 *                 home_club_manager_name: "Stanislav Cherchesov"
 *                 away_club_manager_name: "Unai Emery"
 *                 stadium: "Akhmat-Arena"
 *                 attendance: 21700
 *                 referee: "Vladislav Bezborodov"
 *                 url: "https://www.transfermarkt.co.uk/terek-grozny_spartak-moscow/index/spielbericht/2222597"
 *                 home_club_name: "RFK Akhmat Grozny"
 *                 away_club_name: "FK Spartak Moskva"
 *                 aggregate: "2:1"
 *                 competition_type: "domestic_league"
 *                 competition_name: "premier-liga"
 *       404:
 *         description: Game not found
 */
router.post('/getgame-by-id', gamesController.getGameByGameId);



/**
 * @swagger
 * /api/getbyclubnseason:
 *   post:
 *     summary: Retrieve games by club ID and season
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               club_id:
 *                 type: string
 *                 description: The ID of the club
 *               season:
 *                 type: integer
 *                 description: The season year
 *             example:
 *               club_id: "6414"
 *               season: 2012
 *     responses:
 *       200:
 *         description: A list of games for the specified club and season
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The auto-generated ID of the game
 *                   game_id:
 *                     type: integer
 *                     description: The ID of the game
 *                   competition_id:
 *                     type: string
 *                     description: The ID of the competition
 *                   season:
 *                     type: integer
 *                     description: The season year
 *                   round:
 *                     type: string
 *                     description: The round of the match
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date of the game
 *                   home_club_id:
 *                     type: integer
 *                     description: The ID of the home club
 *                   away_club_id:
 *                     type: integer
 *                     description: The ID of the away club
 *                   home_club_goals:
 *                     type: integer
 *                     description: The number of goals scored by the home club
 *                   away_club_goals:
 *                     type: integer
 *                     description: The number of goals scored by the away club
 *                   home_club_manager_name:
 *                     type: string
 *                     description: The name of the home club manager
 *                   away_club_manager_name:
 *                     type: string
 *                     description: The name of the away club manager
 *                   stadium:
 *                     type: string
 *                     description: The name of the stadium
 *                   attendance:
 *                     type: integer
 *                     description: The attendance of the game
 *                   referee:
 *                     type: string
 *                     description: The referee of the game
 *                   url:
 *                     type: string
 *                     description: The URL to the game details
 *                   home_club_name:
 *                     type: string
 *                     description: The name of the home club
 *                   away_club_name:
 *                     type: string
 *                     description: The name of the away club
 *                   aggregate:
 *                     type: string
 *                     description: The aggregate score
 *                   competition_type:
 *                     type: string
 *                     description: The type of the competition
 *                   competition_name:
 *                     type: string
 *                     description: The name of the competition
 *               example:
 *                 _id: "666ac838a35c99dfed75e3e3"
 *                 game_id: 2284480
 *                 competition_id: "EL"
 *                 season: 2012
 *                 round: "intermediate stage 2nd leg"
 *                 date: "2013-02-20T23:00:00.000Z"
 *                 home_club_id: 6414
 *                 away_club_id: 762
 *                 home_club_goals: 0
 *                 away_club_goals: 1
 *                 home_club_manager_name: "Myron Markevych"
 *                 away_club_manager_name: "Alan Pardew"
 *                 stadium: "OSK Metalist"
 *                 attendance: 39973
 *                 referee: "Serge Gumienny"
 *                 url: "https://www.transfermarkt.co.uk/spielbericht/index/spielbericht/2284480"
 *                 home_club_name: "Metalist Kharkiv (- 2016)"
 *                 away_club_name: "Newcastle United Football Club"
 *                 aggregate: "0:1"
 *                 competition_type: "international_cup"
 *                 competition_name: "europa-league"
 *       404:
 *         description: No games found for this club ID and season
 */
router.post('/getbyclubnseason', gamesController.getGameByClubIdAndSeason);



/**
 * @swagger
 * /api/getgames:
 *   get:
 *     summary: Retrieve a list of games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: A list of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   game_id:
 *                     type: integer
 *                     description: The ID of the game
 *                   name:
 *                     type: string
 *                     description: The name of the game
 *               example:
 *                 game_id: 4129504
 *                 name: "Pendikspor vs Fenerbahçe Spor Kulübü"
 *       500:
 *         description: Internal server error
 */
router.get('/getgames', gamesController.getGames);
module.exports = router;

