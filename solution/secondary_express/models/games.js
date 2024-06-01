const mongoose = require('mongoose');



/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - game_id
 *         - competition_id
 *         - season
 *         - round
 *         - date
 *         - home_club_id
 *         - away_club_id
 *         - home_club_goals
 *         - away_club_goals
 *         - home_club_position
 *         - away_club_position
 *         - home_club_manager_name
 *         - away_club_manager_name
 *         - stadium
 *         - attendance
 *         - referee
 *         - url
 *         - home_club_name
 *         - away_club_name
 *         - aggregate
 *         - competition_type
 *         - competition_name
 *       properties:
 *         game_id:
 *           type: integer
 *           description: The ID of the game
 *         competition_id:
 *           type: string
 *           description: The ID of the competition
 *         season:
 *           type: integer
 *           description: The season year
 *         round:
 *           type: string
 *           description: The round of the match
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the game
 *         home_club_id:
 *           type: integer
 *           description: The ID of the home club
 *         away_club_id:
 *           type: integer
 *           description: The ID of the away club
 *         home_club_goals:
 *           type: integer
 *           description: The number of goals scored by the home club
 *         away_club_goals:
 *           type: integer
 *           description: The number of goals scored by the away club
 *         home_club_position:
 *           type: integer
 *           description: The position of the home club
 *         away_club_position:
 *           type: integer
 *           description: The position of the away club
 *         home_club_manager_name:
 *           type: string
 *           description: The name of the home club manager
 *         away_club_manager_name:
 *           type: string
 *           description: The name of the away club manager
 *         stadium:
 *           type: string
 *           description: The name of the stadium
 *         attendance:
 *           type: integer
 *           description: The attendance of the game
 *         referee:
 *           type: string
 *           description: The referee of the game
 *         url:
 *           type: string
 *           description: The URL to the game details
 *         home_club_name:
 *           type: string
 *           description: The name of the home club
 *         away_club_name:
 *           type: string
 *           description: The name of the away club
 *         aggregate:
 *           type: string
 *           description: The aggregate score
 *         competition_type:
 *           type: string
 *           description: The type of the competition
 *         competition_name:
 *           type: string
 *           description: The name of the competition
 *       example:
 *         game_id: 2211607
 *         competition_id: "RU1"
 *         season: 2012
 *         round: "6. Matchday"
 *         date: "2012-08-24T22:00:00.000Z"
 *         home_club_id: 3725
 *         away_club_id: 232
 *         home_club_goals: 2
 *         away_club_goals: 1
 *         home_club_position: 2
 *         away_club_position: 5
 *         home_club_manager_name: "Stanislav Cherchesov"
 *         away_club_manager_name: "Unai Emery"
 *         stadium: "Akhmat-Arena"
 *         attendance: 21700
 *         referee: "Vladislav Bezborodov"
 *         url: "https://www.transfermarkt.co.uk/terek-grozny_spartak-moscow/index/spielbericht/2222597"
 *         home_club_name: "RFK Akhmat Grozny"
 *         away_club_name: "FK Spartak Moskva"
 *         aggregate: "2:1"
 *         competition_type: "domestic_league"
 *         competition_name: "premier-liga"
 */
const gameSchema = new mongoose.Schema({
    game_id: Number,
    competition_id: String,
    season: Number,
    round: String,
    date: Date,
    home_club_id: Number,
    away_club_id: Number,
    home_club_goals: Number,
    away_club_goals: Number,
    home_club_position: Number,
    away_club_position: Number,
    home_club_manager_name: String,
    away_club_manager_name: String,
    stadium: String,
    attendance: Number,
    referee: String,
    url: String,
    home_club_name: String,
    away_club_name: String,
    aggregate: String,
    competition_type: String,
    competition_name: String
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
