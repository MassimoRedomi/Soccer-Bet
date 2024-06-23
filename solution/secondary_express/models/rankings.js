const mongoose = require('mongoose');

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

module.exports = mongoose.model('Rankings', RankingSchema);
