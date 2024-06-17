const mongoose = require('mongoose');

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
