const Game = require('../models/games');

// Get all games by competition_id
exports.getGamesByCompetitionId = async (req, res) => {
    const { competition_id } = req.body;

    try {
        const games = await Game.find({ competition_id });
        if (!games.length) {
            return res.status(404).json({ message: 'No games found for this competition ID' });
        }
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get games by competition_id and season
exports.getGamesByCompetitionAndSeason = async (req, res) => {
    const { competition_id, season } = req.body;

    try {
        const games = await Game.find({ competition_id, season });
        if (!games.length) {
            return res.status(404).json({ message: 'No games found for this competition ID and season' });
        }
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get unique seasons by competition_id
exports.getSeasonsByCompetitionId = async (req, res) => {
    const { competition_id } = req.body;

    try {
        // Find unique seasons for the given competition_id
        const seasons = await Game.aggregate([
            { $match: { competition_id: competition_id } },
            { $group: { _id: "$season" } },
            { $sort: { _id: -1 } } // Sort seasons in descending order
        ]);

        // Format the result to include both season and competition_id
        const result = seasons.map(season => ({
            competition_id: competition_id,
            season: season._id
        }));

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};