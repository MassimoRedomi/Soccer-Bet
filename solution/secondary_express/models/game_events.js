const mongoose = require('mongoose');

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

