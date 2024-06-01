const mongoose = require('mongoose');



/**
 * @swagger
 * components:
 *   schemas:
 *     Career:
 *       type: object
 *       required:
 *         - player_id
 *         - club_id
 *         - game_id
 *         - player_name
 *         - competition_id
 *         - yellow_cards
 *         - red_cards
 *         - goals
 *         - assists
 *         - minutes_played
 *         - season
 *         - club_name
 *         - competition_name
 *       properties:
 *         player_id:
 *           type: integer
 *           description: The ID of the player
 *         club_id:
 *           type: integer
 *           description: The ID of the club
 *         game_id:
 *           type: integer
 *           description: The ID of the game
 *         player_name:
 *           type: string
 *           description: The name of the player
 *         competition_id:
 *           type: string
 *           description: The ID of the competition
 *         yellow_cards:
 *           type: integer
 *           description: The number of yellow cards
 *         red_cards:
 *           type: integer
 *           description: The number of red cards
 *         goals:
 *           type: integer
 *           description: The number of goals
 *         assists:
 *           type: integer
 *           description: The number of assists
 *         minutes_played:
 *           type: integer
 *           description: The number of minutes played
 *         season:
 *           type: integer
 *           description: The season year
 *         club_name:
 *           type: string
 *           description: The name of the club
 *         competition_name:
 *           type: string
 *           description: The name of the competition
 *       example:
 *         player_id: 10
 *         club_id: 398
 *         game_id: 2254965
 *         player_name: "Miroslav Klose"
 *         competition_id: "ELQ"
 *         yellow_cards: 19
 *         red_cards: 0
 *         goals: 48
 *         assists: 24
 *         minutes_played: 8808
 *         season: 2012
 *         club_name: "Società Sportiva Lazio S.p.A."
 *         competition_name: "europa-league-qualifikation"
 */
const careerSchema = new mongoose.Schema({
    player_id: { type: Number, required: true },
    club_id: { type: Number, required: true },
    game_id: { type: Number, required: true },
    player_name: { type: String, required: true },
    competition_id: { type: String, required: true },
    yellow_cards: { type: Number, required: true },
    red_cards: { type: Number, required: true },
    goals: { type: Number, required: true },
    assists: { type: Number, required: true },
    minutes_played: { type: Number, required: true },
    season: { type: Number, required: true },
    club_name: { type: String, required: true },
    competition_name: {type: String, required: true}
}, { collection: 'career' });

const Career = mongoose.model('Career', careerSchema);

module.exports = Career;
