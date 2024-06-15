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


/**
 * @swagger
 * /api/games_by_champion:
 *   post:
 *     summary: Fetch games by competition ID
 *     description: Forwards a request to another server to fetch games by competition ID.
 *     tags:
 *       - Games
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               competition_id:
 *                 type: string
 *                 example: "RU1"
 *     responses:
 *       200:
 *         description: A list of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   game_id:
 *                     type: integer
 *                     example: 2222597
 *                   competition_id:
 *                     type: string
 *                     example: "RU1"
 *                   season:
 *                     type: integer
 *                     example: 2012
 *                   round:
 *                     type: string
 *                     example: "6. Matchday"
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2012-08-25T00:00:00.000Z"
 *                   home_club_id:
 *                     type: integer
 *                     example: 3725
 *                   away_club_id:
 *                     type: integer
 *                     example: 232
 *                   home_club_goals:
 *                     type: integer
 *                     example: 2
 *                   away_club_goals:
 *                     type: integer
 *                     example: 1
 *                   home_club_position:
 *                     type: integer
 *                     example: 2
 *                   away_club_position:
 *                     type: integer
 *                     example: 5
 *                   home_club_manager_name:
 *                     type: string
 *                     example: "Stanislav Cherchesov"
 *                   away_club_manager_name:
 *                     type: string
 *                     example: "Unai Emery"
 *                   stadium:
 *                     type: string
 *                     example: "Akhmat-Arena"
 *                   attendance:
 *                     type: integer
 *                     example: 21700
 *                   referee:
 *                     type: string
 *                     example: "Vladislav Bezborodov"
 *                   url:
 *                     type: string
 *                     example: "https://www.transfermarkt.co.uk/terek-grozny_spartak-moscow/index/spielbericht/2222597"
 *                   home_club_name:
 *                     type: string
 *                     example: "RFK Akhmat Grozny"
 *                   away_club_name:
 *                     type: string
 *                     example: "FK Spartak Moskva"
 *                   aggregate:
 *                     type: string
 *                     example: "2:1"
 *                   competition_type:
 *                     type: string
 *                     example: "domestic_league"
 *       500:
 *         description: Internal Server Error
 */
router.post('/api/games_by_champion', async (req, res) => {
  const { competition_id } = req.body;

  try {
    const response = await fetch('http://localhost:3002/games/games_by_competition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ competition_id: competition_id })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch games from the competition service');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


/**
 * @swagger
 * /api/games_by_championNseason:
 *   post:
 *     summary: Fetch games by competition ID and season
 *     description: Forwards a request to another server to fetch games by competition ID and season.
 *     tags:
 *       - Games
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               competition_id:
 *                 type: string
 *                 example: "RU1"
 *               season:
 *                 type: integer
 *                 example: 2012
 *     responses:
 *       200:
 *         description: A list of games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   game_id:
 *                     type: integer
 *                     example: 2222597
 *                   competition_id:
 *                     type: string
 *                     example: "RU1"
 *                   season:
 *                     type: integer
 *                     example: 2012
 *                   round:
 *                     type: string
 *                     example: "6. Matchday"
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2012-08-25T00:00:00.000Z"
 *                   home_club_id:
 *                     type: integer
 *                     example: 3725
 *                   away_club_id:
 *                     type: integer
 *                     example: 232
 *                   home_club_goals:
 *                     type: integer
 *                     example: 2
 *                   away_club_goals:
 *                     type: integer
 *                     example: 1
 *                   home_club_position:
 *                     type: integer
 *                     example: 2
 *                   away_club_position:
 *                     type: integer
 *                     example: 5
 *                   home_club_manager_name:
 *                     type: string
 *                     example: "Stanislav Cherchesov"
 *                   away_club_manager_name:
 *                     type: string
 *                     example: "Unai Emery"
 *                   stadium:
 *                     type: string
 *                     example: "Akhmat-Arena"
 *                   attendance:
 *                     type: integer
 *                     example: 21700
 *                   referee:
 *                     type: string
 *                     example: "Vladislav Bezborodov"
 *                   url:
 *                     type: string
 *                     example: "https://www.transfermarkt.co.uk/terek-grozny_spartak-moscow/index/spielbericht/2222597"
 *                   home_club_name:
 *                     type: string
 *                     example: "RFK Akhmat Grozny"
 *                   away_club_name:
 *                     type: string
 *                     example: "FK Spartak Moskva"
 *                   aggregate:
 *                     type: string
 *                     example: "2:1"
 *                   competition_type:
 *                     type: string
 *                     example: "domestic_league"
 *       500:
 *         description: Internal Server Error
 */
router.post('/api/games_by_championNseason', async (req, res) => {
  const { competition_id, season } = req.body;
  try {
    const response = await fetch('http://localhost:3002/games/games_by_competitionNseason', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ competition_id: competition_id, season: season })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch games from the competition service');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /api/seasons_by_champion:
 *   post:
 *     summary: Fetch unique seasons by competition ID
 *     description: Forwards a request to another server to fetch unique seasons by competition ID.
 *     tags:
 *       - Games
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               competition_id:
 *                 type: string
 *                 example: "RU1"
 *     responses:
 *       200:
 *         description: A list of unique seasons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: integer
 *                 example: 2012
 *       500:
 *         description: Internal Server Error
 */
router.post('/api/seasons_by_champion', async (req, res) => {
  const { competitionId } = req.body;
  try {
    const response = await fetch('http://localhost:3002/games/seasons_by_competition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ competition_id: competitionId })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch seasons from the competition service');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /api/clubplayers:
 *   post:
 *     summary: Fetch players by club ID
 *     description: Forwards a request to another server to fetch players by club ID.
 *     tags:
 *       - Players
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               current_club_id:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: A list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   player_id:
 *                     type: integer
 *                     example: 1
 *                   player_name:
 *                     type: string
 *                     example: "John Doe"
 *                   position:
 *                     type: string
 *                     example: "Forward"
 *       500:
 *         description: Internal Server Error
 */
router.post('/api/clubplayers', async (req, res) => {
  const { clubId } = req.body;
  try {
    const response = await fetch('http://localhost:8082/playersoncurrentclub', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clubId: clubId })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch seasons from the competition service');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/api/competitionbyid', async (req, res) => {
  const { competitionId } = req.body;
  try {
    const response = await fetch('http://localhost:8082/getcompetition-by-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ competitionId: competitionId })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch seasons from the competition service');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/api/gamebyid', async (req, res) => {
  const { game_id } = req.body;
  try {
    const response = await fetch('http://localhost:3002/games/getgame-by-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id: game_id })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch seasons from the competition service');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/api/lineupsbyid', async (req, res) => {
  const { game_id } = req.body;
  try {
    const response = await fetch('http://localhost:3002/lineups/lineupbygameid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id: game_id })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch seasons from the competition service');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/api/eventsbygameid', async (req, res) => {
  const { game_id } = req.body;
  try {
    const response = await fetch('http://localhost:3002/events/getgamevents-by-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id: game_id })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch seasons from the competition service');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/api/clubbyid', async (req, res) => {
  const { clubId } = req.body;
  try {
    const response = await fetch('http://localhost:8082/clubbyid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clubId: clubId })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch seasons from the competition service');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/api/getgamesbyclubnseason', async (req, res) => {
  const { club_id, season } = req.body;
  try {
    const response = await fetch('http://localhost:3002/games/getbyclubnseason', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ club_id: club_id, season: season })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch games from the competition service');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/api/playerbyid', async (req, res) => {
  const { player } = req.body;
  try {
    const response = await fetch('http://localhost:8082/playerbyid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId: player })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch seasons from the competition service');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/api/getgames', async (req, res, next) => {
  try {
    const response = await fetch('http://localhost:3002/games/getgames');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});


module.exports = router;