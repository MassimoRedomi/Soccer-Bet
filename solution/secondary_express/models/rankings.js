const mongoose = require('mongoose');



/**
 * @swagger
 * components:
 *   schemas:
 *     Ranking:
 *       type: object
 *       required:
 *         - competition_id
 *         - season
 *         - club_id
 *         - club_name
 *         - club_goals_home
 *         - win_home
 *         - loss_home
 *         - points_home
 *         - home_games
 *         - club_goals_away
 *         - win_away
 *         - loss_away
 *         - points_away
 *         - away_games
 *         - tie
 *         - total_goals
 *         - total_win
 *         - total_loss
 *         - total_points
 *         - total_games
 *       properties:
 *         competition_id:
 *           type: string
 *           description: The ID of the competition
 *         season:
 *           type: integer
 *           description: The season year
 *         club_id:
 *           type: integer
 *           description: The ID of the club
 *         club_name:
 *           type: string
 *           description: The name of the club
 *         club_goals_home:
 *           type: integer
 *           description: The number of goals scored at home by the club
 *         win_home:
 *           type: integer
 *           description: The number of home wins
 *         loss_home:
 *           type: integer
 *           description: The number of home losses
 *         points_home:
 *           type: integer
 *           description: The number of points earned at home
 *         home_games:
 *           type: integer
 *           description: The number of home games played
 *         club_goals_away:
 *           type: integer
 *           description: The number of goals scored away by the club
 *         win_away:
 *           type: integer
 *           description: The number of away wins
 *         loss_away:
 *           type: integer
 *           description: The number of away losses
 *         points_away:
 *           type: integer
 *           description: The number of points earned away
 *         away_games:
 *           type: integer
 *           description: The number of away games played
 *         tie:
 *           type: integer
 *           description: The number of tied games
 *         total_goals:
 *           type: integer
 *           description: The total number of goals scored
 *         total_win:
 *           type: integer
 *           description: The total number of wins
 *         total_loss:
 *           type: integer
 *           description: The total number of losses
 *         total_points:
 *           type: integer
 *           description: The total number of points
 *         total_games:
 *           type: integer
 *           description: The total number of games played
 *       example:
 *         competition_id: "BE1"
 *         season: 2012
 *         club_id: 58
 *         club_name: "Royal Sporting Club Anderlecht"
 *         club_goals_home: 35
 *         win_home: 12
 *         loss_home: 1
 *         points_home: 38
 *         home_games: 15
 *         club_goals_away: 34
 *         win_away: 8
 *         loss_away: 2
 *         points_away: 29
 *         away_games: 15
 *         tie: 7
 *         total_goals: 69
 *         total_win: 20
 *         total_loss: 3
 *         total_points: 67
 *         total_games: 30
 */
const RankingSchema = new mongoose.Schema({
    competition_id: String,
    season: Number,
    club_id: Number,
    club_name: String,
    club_goals_home: Number,
    win_home: Number,
    loss_home: Number,
    points_home: Number,
    home_games: Number,
    club_goals_away: Number,
    win_away: Number,
    loss_away: Number,
    points_away: Number,
    away_games: Number,
    tie: Number,
    total_goals: Number,
    total_win: Number,
    total_loss: Number,
    total_points: Number,
    total_games: Number
}, { collection: 'rankings' });

module.exports = mongoose.model('Ranking', RankingSchema);
