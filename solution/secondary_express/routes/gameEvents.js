const express = require('express');
const router = express.Router();
const gameEventsController = require('../controllers/gameEventsController');



/**
 * @swagger
 * /api/getgamevents-by-id:
 *   post:
 *     summary: Retrieve game events by game ID
 *     tags: [Game Events]
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
 *               game_id: 2211607
 *     responses:
 *       200:
 *         description: A list of game events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The auto-generated ID of the event
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date of the game event
 *                   game_id:
 *                     type: integer
 *                     description: The ID of the game
 *                   minute:
 *                     type: integer
 *                     description: The minute the event occurred
 *                   type:
 *                     type: string
 *                     description: The type of event (e.g., goal, card)
 *                   club_id:
 *                     type: integer
 *                     description: The ID of the club
 *                   player_id:
 *                     type: integer
 *                     description: The ID of the player involved in the event
 *                   description:
 *                     type: string
 *                     description: The description of the event
 *                   player_name:
 *                     type: string
 *                     description: The name of the player involved in the event
 *                   assist_name:
 *                     type: string
 *                     description: The name of the assisting player, if applicable
 *               example:
 *                 _id: "6667989f5e096b0b3b61f14e"
 *                 date: "2012-08-05T00:00:00.000Z"
 *                 game_id: 2211607
 *                 minute: -1
 *                 type: "Cards"
 *                 club_id: 610
 *                 player_id: 124883
 *                 description: "1. Yellow card"
 *                 player_name: "Ricardo van Rhijn"
 *                 assist_name: "NaN"
 *       404:
 *         description: No game events found for this game ID
 *       500:
 *         description: Internal server error
 */
router.post('/getgamevents-by-id', gameEventsController.getGameEventsByGameId);

module.exports = router;
