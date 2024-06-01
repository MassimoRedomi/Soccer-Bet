const express = require('express');
const router = express.Router();
const gameLineupsController = require('../controllers/gameLineupsController');



/**
 * @swagger
 * /api/lineupbygameid:
 *   post:
 *     summary: Retrieve game lineups by game ID
 *     tags: [Game Lineups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               game_id:
 *                 type: integer
 *                 description: The ID of the game
 *             example:
 *               game_id: 3606208
 *     responses:
 *       200:
 *         description: A list of game lineups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The auto-generated ID of the lineup
 *                   game_id:
 *                     type: integer
 *                     description: The ID of the game
 *                   club_id:
 *                     type: integer
 *                     description: The ID of the club
 *                   type:
 *                     type: string
 *                     description: The type of the lineup
 *                   number:
 *                     type: integer
 *                     description: The number of the player
 *                   player_id:
 *                     type: integer
 *                     description: The ID of the player
 *                   player_name:
 *                     type: string
 *                     description: The name of the player
 *                   team_captain:
 *                     type: integer
 *                     description: Whether the player is the team captain (0 or 1)
 *                   position:
 *                     type: string
 *                     description: The position of the player
 *               example:
 *                 _id: "65e891581cbbc61f212ce717"
 *                 game_id: 3606208
 *                 club_id: 338
 *                 type: "starting_lineup"
 *                 number: 89
 *                 player_id: 419061
 *                 player_name: "Vladyslav Supryaga"
 *                 team_captain: 0
 *                 position: "Centre-Forward"
 *       404:
 *         description: No game lineups found for this game ID
 *       500:
 *         description: Internal server error
 */
router.post('/lineupbygameid', gameLineupsController.getGameLineupsByGameId);

module.exports = router;
