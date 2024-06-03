const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /stat:
 *   get:
 *     summary: Render the stat page
 *     responses:
 *       200:
 *         description: Successfully rendered the stat page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/', function(req, res, next) {
    res.render('stat');
});

module.exports = router;