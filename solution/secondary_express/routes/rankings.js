const express = require('express');
const router = express.Router();
const rankingsController = require('../controllers/rankingsController');

/**
 * @swagger
 * /api/getrankings:
 *   post:
 *     summary: Retrieve rankings for a specific competition and season
 *     tags: [Rankings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               competition_id:
 *                 type: string
 *                 description: The ID of the competition
 *               season:
 *                 type: integer
 *                 description: The season year
 *             example:
 *               competition_id: "BE1"
 *               season: 2012
 *     responses:
 *       200:
 *         description: A list of rankings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ranking'
 *       404:
 *         description: Not found
 */
router.post('/getrankings', rankingsController.getRankings);

module.exports = router;
