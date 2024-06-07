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

exports.getSeasonsByCompetitionId = async (req, res) => {
    const { competition_id } = req.body;
    console.log("Fetching seasons for competition_id:", competition_id);

    try {
        // Aggregate to find unique seasons
        const seasons = await Game.aggregate([
            { $match: { competition_id: competition_id } },
            { $group: { _id: "$season", competition_name: { $first: "$competition_name" } } },
            { $sort: { _id: -1 } }
        ]);

        console.log("Seasons aggregation result:", seasons);

        // Format the result to include both season and competition_id
        const result = seasons.map(season => ({
            competition_id: competition_id,
            season: season._id,
            competition_name: season.competition_name
        }));

        console.log("Formatted result:", result);

        res.json(result);
    } catch (err) {
        console.error("Error during aggregation:", err);
        res.status(500).json({ message: err.message });
    }
};