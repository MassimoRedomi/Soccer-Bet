const mongoose = require('mongoose');



/**
 * @swagger
 * components:
 *   schemas:
 *     GameEvent:
 *       type: object
 *       required:
 *         - game_id
 *         - minute
 *         - type
 *         - club_id
 *         - player_id
 *         - description
 *         - player_name
 *       properties:
 *         game_id:
 *           type: integer
 *           description: The ID of the game
 *         minute:
 *           type: integer
 *           description: The minute the event occurred
 *         type:
 *           type: string
 *           description: The type of event (e.g., goal, card)
 *         club_id:
 *           type: integer
 *           description: The ID of the club
 *         player_id:
 *           type: integer
 *           description: The ID of the player involved in the event
 *         description:
 *           type: string
 *           description: The description of the event
 *         player_assist_id:
 *           type: integer
 *           description: The ID of the assisting player, if applicable
 *         player_in_id:
 *           type: integer
 *           description: The ID of the player subbed in, if applicable
 *         player_name:
 *           type: string
 *           description: The name of the player involved in the event
 *         assist_name:
 *           type: string
 *           description: The name of the assisting player, if applicable
 *       example:
 *         game_id: 2211607
 *         minute: -1
 *         type: "Cards"
 *         club_id: 610
 *         player_id: 124883
 *         description: "1. Yellow card"
 *         player_assist_id: null
 *         player_in_id: null
 *         player_name: "Ricardo van Rhijn"
 *         assist_name: "NaN"
 */
const gameEventSchema = new mongoose.Schema({
    game_id: Number,
    minute: Number,
    type: String,
    club_id: Number,
    player_id: Number,
    description: String,
    player_assist_id: Number,
    player_in_id: Number,
    player_name: String,
    assist_name: String
}, { collection: 'game_events' });

const GameEvent = mongoose.model('GameEvent', gameEventSchema);

module.exports = GameEvent;

