const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the game lineups schema
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