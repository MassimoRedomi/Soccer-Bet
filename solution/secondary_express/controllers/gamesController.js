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

exports.getGameByGameId = async (req, res) => {
    const { game_id } = req.body;

    try {
        const game = await Game.findOne({ game_id });
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(game);
    } catch (error) {
        console.error('Error retrieving game by game ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getGameByClubIdAndSeason = async (req, res) => {
    try {
        const { club_id, season } = req.body;

        if (!club_id || !season) {
            return res.status(400).json({ message: 'club_id and season are required.' });
        }

        const games = await Game.find({
            season: season,
            $or: [
                { home_club_id: club_id },
                { away_club_id: club_id }
            ]
        })
            .sort({ competition_id: 1, date: -1 })
            .exec();

        res.status(200).json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};