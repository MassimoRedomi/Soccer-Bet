const mongoose = require('mongoose');
const Schema = mongoose.Schema;



/**
 * @swagger
 * components:
 *   schemas:
 *     GameLineup:
 *       type: object
 *       required:
 *         - game_id
 *         - club_id
 *         - type
 *         - number
 *         - player_id
 *         - player_name
 *         - team_captain
 *         - position
 *       properties:
 *         game_id:
 *           type: integer
 *           description: The ID of the game
 *         club_id:
 *           type: integer
 *           description: The ID of the club
 *         type:
 *           type: string
 *           description: The type of lineup (e.g., starting lineup)
 *         number:
 *           type: integer
 *           description: The jersey number of the player
 *         player_id:
 *           type: integer
 *           description: The ID of the player
 *         player_name:
 *           type: string
 *           description: The name of the player
 *         team_captain:
 *           type: integer
 *           description: Whether the player is the team captain (0 or 1)
 *         position:
 *           type: string
 *           description: The position of the player
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the lineup was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the lineup was last updated
 *       example:
 *         game_id: 3606208
 *         club_id: 338
 *         type: "starting_lineup"
 *         number: 89
 *         player_id: 419061
 *         player_name: "Vladyslav Supryaga"
 *         team_captain: 0
 *         position: "Centre-Forward"
 *         createdAt: "2023-07-21T17:32:28.000Z"
 *         updatedAt: "2023-07-21T17:32:28.000Z"
 */
const gameLineupSchema = new Schema({
    game_id: { type: Number, required: true },
    club_id: { type: Number, required: true },
    type: { type: String, required: true },
    number: { type: Number, required: true },
    player_id: { type: Number, required: true },
    player_name: { type: String, required: true },
    team_captain: { type: Number, required: true },
    position: { type: String, required: true }
}, {
    collection: 'game_lineups',
    timestamps: true
});

const GameLineup = mongoose.model('GameLineup', gameLineupSchema);

module.exports = GameLineup;