const GameLineup = require('../models/game_lineups');

exports.getGameLineupsByGameId = async (req, res) => {
    const { game_id } = req.body;
    try {
        const gameLineups = await GameLineup.find({ game_id: game_id });
        if (gameLineups.length === 0) {
            return res.status(404).json({ message: 'No game lineups found for this game ID' });
        }
        res.status(200).json(gameLineups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};