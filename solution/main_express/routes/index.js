const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const fetch = require('node-fetch');
const saltRounds = 10;

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get the home page
 *     responses:
 *       200:
 *         description: Home page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

/**
 * @swagger
 * /api/soccer-nations:
 *   get:
 *     summary: Get soccer nations
 *     responses:
 *       200:
 *         description: List of soccer nations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/api/soccer-nations', async (req, res, next) => {
  try {
    const response = await fetch('http://localhost:8082/soccer-nations');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/clubs-names:
 *   get:
 *     summary: Get club names
 *     responses:
 *       200:
 *         description: List of club names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/api/clubs-names', async (req, res, next) => {
  try {
    const response = await fetch('http://localhost:8082/clubs-names');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/champions:
 *   get:
 *     summary: Get champions flags
 *     responses:
 *       200:
 *         description: List of champions flags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/api/champions', async (req, res, next) => {
  try {
    const response = await fetch('http://localhost:8082/champions-flags');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get soccer news
 *     responses:
 *       200:
 *         description: List of soccer news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/api/news', async (req, res) => {
  const url = 'https://newsapi.org/v2/everything?q=soccers&apiKey=b23fb742555545c790405871f8795e39';

  try {
    const apiResponse = await fetch(url);
    const data = await apiResponse.json();
    res.json(data);
  } catch (error) {
    console.error("Failed to fetch news:", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

/**
 * @swagger
 * /api/send-country:
 *   post:
 *     summary: Send country information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/api/send-country', async (req, res) => {
  try {
    let nationName = req.body.nation;
    const response = await fetch('http://localhost:8082/champions-x-country', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ countryName: nationName })
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error posting country:', error);
    res.status(500).json({ message: 'Error sending country information' });
  }
});

/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: User signup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password1:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signup success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/api/signup', async (req, res) => {
  try {
    let user = req.body.email;
    let pwd = req.body.password1;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPwd = await bcrypt.hash(pwd, salt);
    const response = await fetch('http://localhost:8082/save-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: user, password: hashPwd })
    });
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error posting user and password:', error);
    res.status(500).json({ message: 'Error sending signup information' });
  }
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await fetch('http://localhost:8082/get-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMail: email })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const user = await response.json();

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.isLoggedIn = true;
      req.session.userEmail = email;
      res.json({ status: 'success', message: 'OK' });
    } else {
      res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ status: 'error', message: 'Error sending login information', details: error.message });
  }
});

/**
 * @swagger
 * /api/check-login:
 *   get:
 *     summary: Check login status
 *     responses:
 *       200:
 *         description: Login status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isLoggedIn:
 *                   type: boolean
 */
router.get('/api/check-login', (req, res) => {
  try {
    const isLoggedIn = !!req.session.isLoggedIn;
    res.json({ isLoggedIn });
  } catch (error) {
    console.error('Failed to check login status:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});

/**
 * @swagger
 * /api/logout:
 *   get:
 *     summary: User logout
 *     responses:
 *       200:
 *         description: Logout success message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.get('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log('Session destruction error:', err);
      return res.status(500).send('Failed to log out.');
    }
    res.send('OK');
  });
});

/**
 * @swagger
 * /api/userinfo:
 *   get:
 *     summary: Get user info
 *     responses:
 *       200:
 *         description: User email
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/api/userinfo', (req, res) => {
  if (req.session.isLoggedIn) {
    const userEmail = req.session.userEmail;
    res.json(userEmail);
  } else {
    res.status(401).json({ message: "Unauthorized access. Please log in." });
  }
});

module.exports = router;
