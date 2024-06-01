const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');



/**
 * @swagger
 * /api/careerbyplayerid:
 *   post:
 *     summary: Retrieve career data by player ID
 *     tags: [Career]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               player_id:
 *                 type: string
 *                 description: The ID of the player
 *             example:
 *               player_id: "10"
 *     responses:
 *       200:
 *         description: A list of career data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The auto-generated ID of the career data
 *                   player_id:
 *                     type: integer
 *                     description: The ID of the player
 *                   club_id:
 *                     type: integer
 *                     description: The ID of the club
 *                   game_id:
 *                     type: integer
 *                     description: The ID of the game
 *                   player_name:
 *                     type: string
 *                     description: The name of the player
 *                   competition_id:
 *                     type: string
 *                     description: The ID of the competition
 *                   yellow_cards:
 *                     type: integer
 *                     description: The number of yellow cards
 *                   red_cards:
 *                     type: integer
 *                     description: The number of red cards
 *                   goals:
 *                     type: integer
 *                     description: The number of goals
 *                   assists:
 *                     type: integer
 *                     description: The number of assists
 *                   minutes_played:
 *                     type: integer
 *                     description: The number of minutes played
 *                   season:
 *                     type: integer
 *                     description: The season year
 *                   club_name:
 *                     type: string
 *                     description: The name of the club
 *                   competition_name:
 *                     type: string
 *                     description: The name of the competition
 *               example:
 *                 _id: "666ee2550bcb24346618d908"
 *                 player_id: 10
 *                 club_id: 398
 *                 game_id: 2254965
 *                 player_name: "Miroslav Klose"
 *                 competition_id: "ELQ"
 *                 yellow_cards: 19
 *                 red_cards: 0
 *                 goals: 48
 *                 assists: 24
 *                 minutes_played: 8808
 *                 season: 2012
 *                 club_name: "Società Sportiva Lazio S.p.A."
 *                 competition_name: "europa-league-qualifikation"
 *       404:
 *         description: No career data found for this player ID
 *       500:
 *         description: Internal server error
 */
router.post('/careerbyplayerid', careerController.getCareerById);

module.exports = router;
