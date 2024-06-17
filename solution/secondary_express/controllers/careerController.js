const Career = require('../models/career');

exports.getCareerById = async (req, res) => {
    const { player_id } = req.body;
    console.log(player_id);
    try {
        const careerData = await Career.find({ player_id: player_id }).sort({ season: -1 });
        console.log(careerData);
        if (careerData.length === 0) {
            return res.status(404).json({ message: 'No career data found for this player ID' });
        }
        res.status(200).json(careerData);
    } catch (error) {
        console.error('Error fetching career data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

