const GameEvent = require('../models/game_events');

exports.getGameEventsByGameId = async (req, res) => {
    const { game_id } = req.body;

    try {
        const gameEvents = await GameEvent.find({ game_id: Number(game_id) }).sort({ minute: 1 });
        console.log('Found game events:', gameEvents);
        res.status(200).json(gameEvents);
    } catch (error) {
        console.error('Error fetching game events:', error);
        res.status(500).json({ message: error.message });
    }
};
