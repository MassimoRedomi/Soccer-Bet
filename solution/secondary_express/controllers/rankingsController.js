const Ranking = require('../models/Rankings');

exports.getRankings = async (req, res) => {
    const { competition_id, season } = req.body;

    try {
        console.log({ competition_id, season } );
        const rankings = await Ranking.find({ competition_id, season }).sort({ total_points: -1 });
        res.status(200).json(rankings);
    } catch (error) {
        console.error('Error fetching rankings:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
