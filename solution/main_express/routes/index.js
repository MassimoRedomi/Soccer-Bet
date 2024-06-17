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
 *     description: Retrieves the HTML content for the home page of the website.
 *     tags:
 *       - Home
 *     responses:
 *       200:
 *         description: Successfully retrieved the home page.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *             example: "<html><head><title>Home Page</title></head><body>Welcome to the Home Page!</body></html>"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});



/**
 * @swagger
 * /api/soccer-nations:
 *   get:
 *     summary: Retrieve the list of soccer nations
 *     description: Fetches a list of soccer nations with their SVG flags from an external service.
 *     tags:
 *       - Data Nation
 *     responses:
 *       200:
 *         description: A list of soccer nations with their SVG flags.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Greece"
 *                   sig:
 *                     type: string
 *                     example: "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export -->\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512.001 512.001\" style=\"enable-background:new 0 0 512.001 512.001;\" xml:space=\"preserve\">\n<g>\n<rect y=\"125.551\" style=\"fill:#F5F5F5;\" width=\"512\" height=\"37.27\"/>\n<rect y=\"200.091\" style=\"fill:#F5F5F5;\" width=\"512\" height=\"37.27\"/>\n<rect y=\"274.641\" style=\"fill:#F5F5F5;\" width=\"512\" height=\"37.27\"/>\n</g>\n<rect y=\"311.911\" style=\"fill:#41479B;\" width=\"512\" height=\"37.27\"/>\n<rect y=\"349.181\" style=\"fill:#F5F5F5;\" width=\"512\" height=\"37.27\"/>\n<g>\n<path style=\"fill:#41479B;\" d=\"M8.828,423.725h494.345c4.875,0,8.828-3.953,8.828-8.828v-28.445H0v28.445 C0,419.773,3.953,423.725,8.828,423.725z\"/>\n<path style=\"fill:#41479B;\" d=\"M512,125.549V97.104c0-4.875-3.953-8.828-8.828-8.828H8.828C3.953,88.277,0,92.229,0,97.104v65.717v37.271v74.545h512v-37.272H176.552v-37.272H512v-37.272H176.552v-37.272C176.552,125.549,512,125.549,512,125.549z\"/>\n</g>\n<polygon style=\"fill:#F5F5F5;\" points=\"176.552,162.821 106.912,162.821 106.912,88.277 69.64,88.277 69.64,162.821 0,162.821 0,200.093 69.64,200.093 69.64,274.637 106.912,274.637 106.912,200.093 176.552,200.093 \"/>\n</svg>"
 *             example: [
 *               {
 *                 "name": "Greece",
 *                 "sig": "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export -->\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512.001 512.001\" style=\"enable-background:new 0 0 512.001 512.001;\" xml:space=\"preserve\">\n<g>\n<rect y=\"125.551\" style=\"fill:#F5F5F5;\" width=\"512\" height=\"37.27\"/>\n<rect y=\"200.091\" style=\"fill:#F5F5F5;\" width=\"512\" height=\"37.27\"/>\n<rect y=\"274.641\" style=\"fill:#F5F5F5;\" width=\"512\" height=\"37.27\"/>\n</g>\n<rect y=\"311.911\" style=\"fill:#41479B;\" width=\"512\" height=\"37.27\"/>\n<rect y=\"349.181\" style=\"fill:#F5F5F5;\" width=\"512\" height=\"37.27\"/>\n<g>\n<path style=\"fill:#41479B;\" d=\"M8.828,423.725h494.345c4.875,0,8.828-3.953,8.828-8.828v-28.445H0v28.445 C0,419.773,3.953,423.725,8.828,423.725z\"/>\n<path style=\"fill:#41479B;\" d=\"M512,125.549V97.104c0-4.875-3.953-8.828-8.828-8.828H8.828C3.953,88.277,0,92.229,0,97.104v65.717v37.271v74.545h512v-37.272H176.552v-37.272H512v-37.272H176.552v-37.272C176.552,125.549,512,125.549,512,125.549z\"/>\n</g>\n<polygon style=\"fill:#F5F5F5;\" points=\"176.552,162.821 106.912,162.821 106.912,88.277 69.64,88.277 69.64,162.821 0,162.821 0,200.093 69.64,200.093 69.64,274.637 106.912,274.637 106.912,200.093 176.552,200.093 \"/>\n</svg>"
 *               }
 *             ]
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
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
 *     summary: Retrieve the list of club names
 *     description: Fetches a list of club names and their IDs from an external service.
 *     tags:
 *       - Data Club
 *     responses:
 *       200:
 *         description: A list of club names with their IDs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Sportverein Darmstadt 1898 e. V."
 *                   clubId:
 *                     type: integer
 *                     example: 105
 *             example: [
 *               {"name":"Sportverein Darmstadt 1898 e. V.","clubId":105},
 *               {"name":"FK Ural Yekaterinburg","clubId":11127},
 *               {"name":"Beşiktaş Jimnastik Kulübü","clubId":114}
 *             ]
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
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
 *     summary: Retrieve the list of champions with their flags
 *     description: Fetches a list of champions, their types, country details, and flags from an external service.
 *     tags:
 *       - Data Champion
 *     responses:
 *       200:
 *         description: A list of champions with their details and SVG flags.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "ukrainian-cup"
 *                   type:
 *                     type: string
 *                     example: "domestic_cup"
 *                   countryName:
 *                     type: string
 *                     example: "Ukraine"
 *                   competitionId:
 *                     type: string
 *                     example: "UKRP"
 *                   competitionCode:
 *                     type: string
 *                     example: "ukrainian-cup"
 *                   countryId:
 *                     type: string
 *                     example: "177"
 *                   domesticLeagueCode:
 *                     type: string
 *                     example: "UKR1"
 *                   confederation:
 *                     type: string
 *                     example: "europa"
 *                   url:
 *                     type: string
 *                     example: "https://www.transfermarkt.co.uk/ukrainian-cup/startseite/wettbewerb/UKRP"
 *                   sig:
 *                     type: string
 *                     example: "<svg></svg>"
 *                   subType:
 *                     type: string
 *                     example: "domestic_cup"
 *             example: [
 *               {
 *                 "name": "ukrainian-cup",
 *                 "type": "domestic_cup",
 *                 "countryName": "Ukraine",
 *                 "competitionId": "UKRP",
 *                 "competitionCode": "ukrainian-cup",
 *                 "countryId": "177",
 *                 "domesticLeagueCode": "UKR1",
 *                 "confederation": "europa",
 *                 "url": "https://www.transfermarkt.co.uk/ukrainian-cup/startseite/wettbewerb/UKRP",
 *                 "sig": "<svg></svg>",
 *                 "subType": "domestic_cup"
 *               }
 *             ]
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
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
 *     summary: Retrieve the latest soccer news
 *     description: Fetches the latest soccer news articles from an external news API.
 *     tags:
 *       - Data News
 *     responses:
 *       200:
 *         description: A list of latest soccer news articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *                 totalResults:
 *                   type: integer
 *                   example: 74
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       source:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *                           name:
 *                             type: string
 *                             example: "Mundodeportivo.com"
 *                       author:
 *                         type: string
 *                         nullable: true
 *                         example: "Pablo Planas Piera"
 *                       title:
 *                         type: string
 *                         example: "Míchel, mejor entrenador..."
 *                       description:
 *                         type: string
 *                         example: "Míchel se coronó como..."
 *                       url:
 *                         type: string
 *                         example: "https://www.mundodeportivo..."
 *                       urlToImage:
 *                         type: string
 *                         nullable: true
 *                         example: "https://www.mundodeportivo.com/files/og_thumbnail/files/fp/uploads/2024/05/26/66539de2725ad.r_d.3890-2616-1542.jpeg"
 *                       publishedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-05-28T19:16:54Z"
 *                       content:
 *                         type: string
 *                         example: "Míchel se coronó como..."
 *             example: {
 *               "status": "ok",
 *               "totalResults": 74,
 *               "articles": [
 *                 {
 *                   "source": {
 *                     "id": null,
 *                     "name": "Mundodeportivo.com"
 *                   },
 *                   "author": "Pablo Planas Piera",
 *                   "title": "Míchel, mejor entrenador...",
 *                   "description": "Míchel se coronó como...",
 *                   "url": "https://www.mundodeportivo...",
 *                   "urlToImage": "https://www.mundodeportivo.com/files/og_thumbnail/files/fp/uploads/2024/05/26/66539de2725ad.r_d.3890-2616-1542.jpeg",
 *                   "publishedAt": "2024-05-28T19:16:54Z",
 *                   "content": "Míchel se coronó como..."
 *                 },
 *                 {
 *                   "source": {
 *                     "id": "nbc-news",
 *                     "name": "NBC News"
 *                   },
 *                   "author": "The Associated Press",
 *                   "title": "Kylian Mbappé joins Real...",
 *                   "description": "Kylian Mbappé is finally...",
 *                   "url": "https://www.nbcnews.com/news...",
 *                   "urlToImage": "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/rockcms/2024-06/240603-Kylian-Mbappe-real-madrid-se-202p-bc86d9.jpg",
 *                   "publishedAt": "2024-06-03T18:05:55Z",
 *                   "content": "MADRID Kylian Mbappé is finally..."
 *                 }
 *               ]
 *             }
 *       500:
 *         description: Failed to fetch data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch data"
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
 *     summary: Send country name to retrieve champion details
 *     description: Fetches champion details based on the provided country name.
 *     tags:
 *       - Data Champion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nation:
 *                 type: string
 *                 example: "Italy"
 *     responses:
 *       200:
 *         description: A list of champions with their details and SVG flags.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "italy-cup"
 *                   type:
 *                     type: string
 *                     example: "domestic_cup"
 *                   countryName:
 *                     type: string
 *                     example: "Italy"
 *                   competitionId:
 *                     type: string
 *                     example: "CIT"
 *                   competitionCode:
 *                     type: string
 *                     example: "italy-cup"
 *                   countryId:
 *                     type: string
 *                     example: "75"
 *                   domesticLeagueCode:
 *                     type: string
 *                     example: "IT1"
 *                   confederation:
 *                     type: string
 *                     example: "europa"
 *                   url:
 *                     type: string
 *                     example: "https://www.transfermarkt.co.uk/italy-cup/startseite/wettbewerb/CIT"
 *                   sig:
 *                     type: string
 *                     example: "<svg height=\"512\" ... </svg>"
 *                   subType:
 *                     type: string
 *                     example: "domestic_cup"
 *             example: [
 *               {
 *                 "name": "italy-cup",
 *                 "type": "domestic_cup",
 *                 "countryName": "Italy",
 *                 "competitionId": "CIT",
 *                 "competitionCode": "italy-cup",
 *                 "countryId": "75",
 *                 "domesticLeagueCode": "IT1",
 *                 "confederation": "europa",
 *                 "url": "https://www.transfermarkt.co.uk/italy-cup/startseite/wettbewerb/CIT",
 *                 "sig": "<svg height=\"512\" ... </svg>",
 *                 "subType": "domestic_cup"
 *               }
 *             ]
 *       500:
 *         description: Error sending country information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error sending country information"
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
 *     summary: Sign up a new user
 *     description: Registers a new user by sending the email and hashed password to an external service.
 *     tags:
 *       - Data User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "pippo@gmail.com"
 *               password1:
 *                 type: string
 *                 example: "Pippo@1234567898"
 *     responses:
 *       200:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: { "message": "User successfully registered." }
 *       500:
 *         description: Error sending signup information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error sending signup information"
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
 *     summary: Log in a user
 *     description: Authenticates a user by verifying the provided email and password.
 *     tags:
 *       - Data User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "pippo@gmail.com"
 *               password:
 *                 type: string
 *                 example: "Pippo@1234567898"
 *     responses:
 *       200:
 *         description: User successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "OK"
 *       401:
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Error sending login information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Error sending login information"
 *                 details:
 *                   type: string
 *                   example: "Network response was not ok."
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
      const errorMessage = `Network response was not ok: ${response.statusText}`;
      console.error(errorMessage);
      return res.status(response.status).json({ status: 'error', message: errorMessage });
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
 *     summary: Check user login status
 *     description: Returns the login status of the user based on the session information.
 *     tags:
 *       - Data User
 *     responses:
 *       200:
 *         description: Login status retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isLoggedIn:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 details:
 *                   type: string
 *                   example: "Error message details"
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
 *     summary: Log out the user
 *     description: Logs out the user by destroying the session.
 *     tags:
 *       - Data User
 *     responses:
 *       200:
 *         description: User successfully logged out.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "OK"
 *       500:
 *         description: Failed to log out.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Failed to log out."
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
 *     summary: Get user information
 *     description: Returns the email of the logged-in user if the user is authenticated.
 *     tags:
 *       - Data User
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "pippo@gmail.com"
 *       401:
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access. Please log in."
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
 *       -  Data Games
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
    const response = await fetch('http://localhost:3002/api/games_by_competition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ competition_id })
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch games: ${response.statusText}`;
      console.error(errorMessage);
      return res.status(response.status).json({ message: errorMessage });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});




/**
 * @swagger
 * /api/games_by_championNseason:
 *   post:
 *     summary: Fetch games by competition ID and season
 *     description: Forwards a request to another server to fetch games by competition ID and season.
 *     tags:
 *       - Data Games
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
    const response = await fetch('http://localhost:3002/api/games_by_competitionNseason', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ competition_id, season })
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch games: ${response.statusText}`;
      console.error(errorMessage);
      return res.status(response.status).json({ message: errorMessage });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});




/**
 * @swagger
 * /api/seasons_by_champion:
 *   post:
 *     summary: Get seasons by competition ID
 *     description: Fetches a list of seasons for a given competition ID from an external service.
 *     tags:
 *       - Data Season
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               competitionId:
 *                 type: string
 *                 example: "RU1"
 *     responses:
 *       200:
 *         description: A list of seasons for the given competition ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   competition_id:
 *                     type: string
 *                     example: "RU1"
 *                   season:
 *                     type: integer
 *                     example: 2023
 *                   competition_name:
 *                     type: string
 *                     example: "premier-liga"
 *             example: [
 *               { "competition_id": "RU1", "season": 2023, "competition_name": "premier-liga" },
 *               { "competition_id": "RU1", "season": 2022, "competition_name": "premier-liga" },
 *               { "competition_id": "RU1", "season": 2021, "competition_name": "premier-liga" }
 *             ]
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/api/seasons_by_champion', async (req, res) => {
  const { competitionId } = req.body;
  try {
    const response = await fetch('http://localhost:3002/api/seasons_by_competition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ competition_id: competitionId })
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch seasons: ${response.statusText}`;
      console.error(errorMessage);
      return res.status(response.status).json({ message: errorMessage });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});




/**
 * @swagger
 * /api/clubplayers:
 *   post:
 *     summary: Get players by club ID
 *     description: Fetches a list of players for a given club ID from an external service.
 *     tags:
 *       - Data Player
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clubId:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: A list of players for the given club ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   playerId:
 *                     type: integer
 *                     example: 118397
 *                   name:
 *                     type: string
 *                     example: "Alessandro Schöpf"
 *                   yellowCards:
 *                     type: integer
 *                     example: 21
 *                   redCards:
 *                     type: integer
 *                     example: 0
 *                   goals:
 *                     type: integer
 *                     example: 17
 *                   assists:
 *                     type: integer
 *                     example: 14
 *                   minutesPlayed:
 *                     type: integer
 *                     example: 11435
 *                   currentClub:
 *                     type: object
 *                     properties:
 *                       clubId:
 *                         type: integer
 *                         example: 10
 *                       clubCode:
 *                         type: string
 *                         example: "arminia-bielefeld"
 *                       name:
 *                         type: string
 *                         example: "Arminia Bielefeld"
 *                       domesticCompetition:
 *                         type: object
 *                         properties:
 *                           competitionId:
 *                             type: string
 *                             example: "L1"
 *                           competitionCode:
 *                             type: string
 *                             example: "bundesliga"
 *                           name:
 *                             type: string
 *                             example: "bundesliga"
 *                           subType:
 *                             type: string
 *                             example: "first_tier"
 *                           type:
 *                             type: string
 *                             example: "domestic_league"
 *                           countryId:
 *                             type: string
 *                             example: "40"
 *                           countryName:
 *                             type: string
 *                             example: "Germany"
 *                           domesticLeagueCode:
 *                             type: string
 *                             example: "L1"
 *                           confederation:
 *                             type: string
 *                             example: "europa"
 *                           url:
 *                             type: string
 *                             example: "https://www.transfermarkt..."
 *                       totalMarketValue:
 *                         type: string
 *                         example: null
 *                       squadSize:
 *                         type: integer
 *                         example: 27
 *                       averageAge:
 *                         type: number
 *                         format: float
 *                         example: 25.3
 *                       foreignersNumber:
 *                         type: integer
 *                         example: 15
 *                       foreignersPercentage:
 *                         type: number
 *                         format: float
 *                         example: 55.6
 *                       nationalTeamPlayers:
 *                         type: integer
 *                         example: 4
 *                       stadiumName:
 *                         type: string
 *                         example: "SchücoArena"
 *                       stadiumSeats:
 *                         type: integer
 *                         example: 26515
 *                       netTransferRecord:
 *                         type: string
 *                         example: "+€5.90m"
 *                       coachName:
 *                         type: string
 *                         example: null
 *                       lastSeason:
 *                         type: integer
 *                         example: 2021
 *                       url:
 *                         type: string
 *                         example: "https://www.transfermarkt..."
 *                   countryOfBirth:
 *                     type: string
 *                     example: "Austria"
 *                   cityOfBirth:
 *                     type: string
 *                     example: "Umhausen"
 *                   countryOfCitizenship:
 *                     type: string
 *                     example: "Austria"
 *                   dateOfBirth:
 *                     type: string
 *                     format: date
 *                     example: "1994-02-07"
 *                   foot:
 *                     type: string
 *                     example: "right"
 *                   heightInCm:
 *                     type: integer
 *                     example: 178
 *                   highestMarketValueInEur:
 *                     type: integer
 *                     example: 7500000
 *                   imageUrl:
 *                     type: string
 *                     example: "https://img.a.transfermarkt..."
 *                   url:
 *                     type: string
 *                     example: "https://www.transfermarkt..."
 *                   partite:
 *                     type: integer
 *                     example: 105
 *                   age:
 *                     type: integer
 *                     example: 30
 *             example: [
 *               {
 *                 "playerId": 118397,
 *                 "name": "Alessandro Schöpf",
 *                 "yellowCards": 21,
 *                 "redCards": 0,
 *                 "goals": 17,
 *                 "assists": 14,
 *                 "minutesPlayed": 11435,
 *                 "currentClub": {
 *                   "clubId": 10,
 *                   "clubCode": "arminia-bielefeld",
 *                   "name": "Arminia Bielefeld",
 *                   "domesticCompetition": {
 *                     "competitionId": "L1",
 *                     "competitionCode": "bundesliga",
 *                     "name": "bundesliga",
 *                     "subType": "first_tier",
 *                     "type": "domestic_league",
 *                     "countryId": "40",
 *                     "countryName": "Germany",
 *                     "domesticLeagueCode": "L1",
 *                     "confederation": "europa",
 *                     "url": "https://www.transfermarkt..."
 *                   },
 *                   "totalMarketValue": null,
 *                   "squadSize": 27,
 *                   "averageAge": 25.3,
 *                   "foreignersNumber": 15,
 *                   "foreignersPercentage": 55.6,
 *                   "nationalTeamPlayers": 4,
 *                   "stadiumName": "SchücoArena",
 *                   "stadiumSeats": 26515,
 *                   "netTransferRecord": "+€5.90m",
 *                   "coachName": null,
 *                   "lastSeason": 2021,
 *                   "url": "https://www.transfermarkt..."
 *                 },
 *                 "countryOfBirth": "Austria",
 *                 "cityOfBirth": "Umhausen",
 *                 "countryOfCitizenship": "Austria",
 *                 "dateOfBirth": "1994-02-07",
 *                 "foot": "right",
 *                 "heightInCm": 178,
 *                 "highestMarketValueInEur": 7500000,
 *                 "imageUrl": "https://img.a.transfermarkt...",
 *                 "url": "https://www.transfermarkt...",
 *                 "partite": 105,
 *                 "age": 30
 *               }
 *             ]
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/api/clubplayers', async (req, res) => {
  const { clubId } = req.body;
  try {
    const response = await fetch('http://localhost:8082/playersoncurrentclub', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clubId })
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch players: ${response.statusText}`;
      console.error(errorMessage);
      return res.status(response.status).json({ message: errorMessage });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});




/**
 * @swagger
 * /api/competitionbyid:
 *   post:
 *     summary: Get competition details by ID
 *     description: Fetches details of a competition based on the provided competition ID from an external service.
 *     tags:
 *       - Data Champion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               competitionId:
 *                 type: string
 *                 example: "RU1"
 *     responses:
 *       200:
 *         description: Competition details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 competitionId:
 *                   type: string
 *                   example: "RU1"
 *                 competitionCode:
 *                   type: string
 *                   example: "premier-liga"
 *                 name:
 *                   type: string
 *                   example: "premier-liga"
 *                 subType:
 *                   type: string
 *                   example: "first_tier"
 *                 type:
 *                   type: string
 *                   example: "domestic_league"
 *                 countryId:
 *                   type: string
 *                   example: "141"
 *                 countryName:
 *                   type: string
 *                   example: "Russia"
 *                 domesticLeagueCode:
 *                   type: string
 *                   example: "RU1"
 *                 confederation:
 *                   type: string
 *                   example: "europa"
 *                 url:
 *                   type: string
 *                   example: "https://www.transfermarkt.co.uk/premier-liga/startseite/wettbewerb/RU1"
 *             example: {
 *               "competitionId": "RU1",
 *               "competitionCode": "premier-liga",
 *               "name": "premier-liga",
 *               "subType": "first_tier",
 *               "type": "domestic_league",
 *               "countryId": "141",
 *               "countryName": "Russia",
 *               "domesticLeagueCode": "RU1",
 *               "confederation": "europa",
 *               "url": "https://www.transfermarkt.co.uk/premier-liga/startseite/wettbewerb/RU1"
 *             }
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/api/competitionbyid', async (req, res) => {
  const { competitionId } = req.body;
  try {
    const response = await fetch('http://localhost:8082/getcompetition-by-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ competitionId })
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch competition information: ${response.statusText}`;
      console.error(errorMessage);
      return res.status(response.status).json({ message: errorMessage });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});




/**
 * @swagger
 * /api/gamebyid:
 *   post:
 *     summary: Get game details by ID
 *     description: Fetches details of a game based on the provided game ID from an external service.
 *     tags:
 *       - Data Game
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               game_id:
 *                 type: integer
 *                 example: 2222597
 *     responses:
 *       200:
 *         description: Game details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "666ac837a35c99dfed759249"
 *                 game_id:
 *                   type: integer
 *                   example: 2222597
 *                 competition_id:
 *                   type: string
 *                   example: "RU1"
 *                 season:
 *                   type: integer
 *                   example: 2012
 *                 round:
 *                   type: string
 *                   example: "6. Matchday"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2012-08-24T22:00:00.000Z"
 *                 home_club_id:
 *                   type: integer
 *                   example: 3725
 *                 away_club_id:
 *                   type: integer
 *                   example: 232
 *                 home_club_goals:
 *                   type: integer
 *                   example: 2
 *                 away_club_goals:
 *                   type: integer
 *                   example: 1
 *                 home_club_position:
 *                   type: integer
 *                   example: 2
 *                 away_club_position:
 *                   type: integer
 *                   example: 5
 *                 home_club_manager_name:
 *                   type: string
 *                   example: "Stanislav Cherchesov"
 *                 away_club_manager_name:
 *                   type: string
 *                   example: "Unai Emery"
 *                 stadium:
 *                   type: string
 *                   example: "Akhmat-Arena"
 *                 attendance:
 *                   type: integer
 *                   example: 21700
 *                 referee:
 *                   type: string
 *                   example: "Vladislav Bezborodov"
 *                 url:
 *                   type: string
 *                   example: "https://www.transfermarkt.co.uk/terek-grozny_spartak-moscow/index/spielbericht/2222597"
 *                 home_club_name:
 *                   type: string
 *                   example: "RFK Akhmat Grozny"
 *                 away_club_name:
 *                   type: string
 *                   example: "FK Spartak Moskva"
 *                 aggregate:
 *                   type: string
 *                   example: "2:1"
 *                 competition_type:
 *                   type: string
 *                   example: "domestic_league"
 *                 competition_name:
 *                   type: string
 *                   example: "premier-liga"
 *             example: {
 *               "_id": "666ac837a35c99dfed759249",
 *               "game_id": 2222597,
 *               "competition_id": "RU1",
 *               "season": 2012,
 *               "round": "6. Matchday",
 *               "date": "2012-08-24T22:00:00.000Z",
 *               "home_club_id": 3725,
 *               "away_club_id": 232,
 *               "home_club_goals": 2,
 *               "away_club_goals": 1,
 *               "home_club_position": 2,
 *               "away_club_position": 5,
 *               "home_club_manager_name": "Stanislav Cherchesov",
 *               "away_club_manager_name": "Unai Emery",
 *               "stadium": "Akhmat-Arena",
 *               "attendance": 21700,
 *               "referee": "Vladislav Bezborodov",
 *               "url": "https://www.transfermarkt.co.uk/terek-grozny_spartak-moscow/index/spielbericht/2222597",
 *               "home_club_name": "RFK Akhmat Grozny",
 *               "away_club_name": "FK Spartak Moskva",
 *               "aggregate": "2:1",
 *               "competition_type": "domestic_league",
 *               "competition_name": "premier-liga"
 *             }
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/api/gamebyid', async (req, res) => {
  const { game_id } = req.body;
  try {
    const response = await fetch('http://localhost:3002/api/getgame-by-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id })
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch game information: ${response.statusText}`;
      console.error(errorMessage);
      return res.status(response.status).json({ message: errorMessage });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});




/**
 * @swagger
 * /api/lineupsbyid:
 *   post:
 *     summary: Get lineups by game ID
 *     description: Fetches the lineup details for a given game ID from an external service.
 *     tags:
 *       - Data Lineups
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               game_id:
 *                 type: integer
 *                 example: 3606208
 *     responses:
 *       200:
 *         description: Lineup details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "65e891581cbbc61f212ce717"
 *                   game_id:
 *                     type: integer
 *                     example: 3606208
 *                   club_id:
 *                     type: integer
 *                     example: 338
 *                   type:
 *                     type: string
 *                     example: "starting_lineup"
 *                   number:
 *                     type: integer
 *                     example: 89
 *                   player_id:
 *                     type: integer
 *                     example: 419061
 *                   player_name:
 *                     type: string
 *                     example: "Vladyslav Supryaga"
 *                   team_captain:
 *                     type: integer
 *                     example: 0
 *                   position:
 *                     type: string
 *                     example: "Centre-Forward"
 *             example: [
 *               {
 *                 "_id": "65e891581cbbc61f212ce717",
 *                 "game_id": 3606208,
 *                 "club_id": 338,
 *                 "type": "starting_lineup",
 *                 "number": 89,
 *                 "player_id": 419061,
 *                 "player_name": "Vladyslav Supryaga",
 *                 "team_captain": 0,
 *                 "position": "Centre-Forward"
 *               }
 *             ]
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/api/lineupsbyid', async (req, res) => {
  const { game_id } = req.body;
  try {
    const response = await fetch('http://localhost:3002/api/lineupbygameid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id })
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch lineups: ${response.statusText}`;
      console.error(errorMessage);
      return res.status(response.status).json({ message: errorMessage });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});




/**
 * @swagger
 * /api/eventsbygameid:
 *   post:
 *     summary: Get events by game ID
 *     description: Fetches the event details for a given game ID from an external service.
 *     tags:
 *       - Data Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               game_id:
 *                 type: integer
 *                 example: 2211607
 *     responses:
 *       200:
 *         description: Event details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6667989f5e096b0b3b61f14e"
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2012-08-05T00:00:00.000Z"
 *                   game_id:
 *                     type: integer
 *                     example: 2211607
 *                   minute:
 *                     type: integer
 *                     example: -1
 *                   type:
 *                     type: string
 *                     example: "Cards"
 *                   club_id:
 *                     type: integer
 *                     example: 610
 *                   player_id:
 *                     type: integer
 *                     example: 124883
 *                   description:
 *                     type: string
 *                     example: "1. Yellow card"
 *                   player_name:
 *                     type: string
 *                     example: "Ricardo van Rhijn"
 *                   assist_name:
 *                     type: string
 *                     example: "NaN"
 *             example: [
 *               {
 *                 "_id": "6667989f5e096b0b3b61f14e",
 *                 "date": "2012-08-05T00:00:00.000Z",
 *                 "game_id": 2211607,
 *                 "minute": -1,
 *                 "type": "Cards",
 *                 "club_id": 610,
 *                 "player_id": 124883,
 *                 "description": "1. Yellow card",
 *                 "player_name": "Ricardo van Rhijn",
 *                 "assist_name": "NaN"
 *               }
 *             ]
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/api/eventsbygameid', async (req, res) => {
  const { game_id } = req.body;
  try {
    const response = await fetch('http://localhost:3002/api/getgamevents-by-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game_id })
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch events: ${response.statusText}`;
      console.error(errorMessage);
      return res.status(response.status).json({ message: errorMessage });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});




/**
 * @swagger
 * /api/clubbyid:
 *   post:
 *     summary: Get club information by ID
 *     description: Fetches details of a specific club by its ID from an external service.
 *     tags:
 *       - Data Club
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clubId:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Club details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clubId:
 *                   type: integer
 *                   example: 10
 *                 clubCode:
 *                   type: string
 *                   example: "arminia-bielefeld"
 *                 name:
 *                   type: string
 *                   example: "Arminia Bielefeld"
 *                 domesticCompetition:
 *                   type: object
 *                   properties:
 *                     competitionId:
 *                       type: string
 *                       example: "L1"
 *                     competitionCode:
 *                       type: string
 *                       example: "bundesliga"
 *                     name:
 *                       type: string
 *                       example: "bundesliga"
 *                     subType:
 *                       type: string
 *                       example: "first_tier"
 *                     type:
 *                       type: string
 *                       example: "domestic_league"
 *                     countryId:
 *                       type: integer
 *                       example: 40
 *                     countryName:
 *                       type: string
 *                       example: "Germany"
 *                     domesticLeagueCode:
 *                       type: string
 *                       example: "L1"
 *                     confederation:
 *                       type: string
 *                       example: "europa"
 *                     url:
 *                       type: string
 *                       example: "https://www.transfermarkt.co.uk/bundesliga/startseite/wettbewerb/L1"
 *                 totalMarketValue:
 *                   type: string
 *                   example: null
 *                 squadSize:
 *                   type: integer
 *                   example: 27
 *                 averageAge:
 *                   type: number
 *                   example: 25.3
 *                 foreignersNumber:
 *                   type: integer
 *                   example: 15
 *                 foreignersPercentage:
 *                   type: number
 *                   example: 55.6
 *                 nationalTeamPlayers:
 *                   type: integer
 *                   example: 4
 *                 stadiumName:
 *                   type: string
 *                   example: "SchücoArena"
 *                 stadiumSeats:
 *                   type: integer
 *                   example: 26515
 *                 netTransferRecord:
 *                   type: string
 *                   example: "+€5.90m"
 *                 coachName:
 *                   type: string
 *                   example: null
 *                 lastSeason:
 *                   type: integer
 *                   example: 2021
 *                 url:
 *                   type: string
 *                   example: "https://www.transfermarkt.co.uk/arminia-bielefeld/startseite/verein/10"
 *             example: {
 *               "clubId": 10,
 *               "clubCode": "arminia-bielefeld",
 *               "name": "Arminia Bielefeld",
 *               "domesticCompetition": {
 *                 "competitionId": "L1",
 *                 "competitionCode": "bundesliga",
 *                 "name": "bundesliga",
 *                 "subType": "first_tier",
 *                 "type": "domestic_league",
 *                 "countryId": 40,
 *                 "countryName": "Germany",
 *                 "domesticLeagueCode": "L1",
 *                 "confederation": "europa",
 *                 "url": "https://www.transfermarkt.co.uk/bundesliga/startseite/wettbewerb/L1"
 *               },
 *               "totalMarketValue": null,
 *               "squadSize": 27,
 *               "averageAge": 25.3,
 *               "foreignersNumber": 15,
 *               "foreignersPercentage": 55.6,
 *               "nationalTeamPlayers": 4,
 *               "stadiumName": "SchücoArena",
 *               "stadiumSeats": 26515,
 *               "netTransferRecord": "+€5.90m",
 *               "coachName": null,
 *               "lastSeason": 2021,
 *               "url": "https://www.transfermarkt.co.uk/arminia-bielefeld/startseite/verein/10"
 *             }
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/api/clubbyid', async (req, res) => {
  const { clubId } = req.body;
  try {
    const response = await fetch('http://localhost:8082/clubbyid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clubId })
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch club information: ${response.statusText}`;
      console.error(errorMessage);
      return res.status(response.status).json({ message: errorMessage });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});




/**
 * @swagger
 * /api/getgamesbyclubnseason:
 *   post:
 *     summary: Get games by club ID and season
 *     description: Fetches games for a specific club in a given season from an external service.
 *     tags:
 *       - Data Game
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               club_id:
 *                 type: integer
 *                 example: 10
 *               season:
 *                 type: integer
 *                 example: 2022
 *     responses:
 *       200:
 *         description: Games retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "666ac838a35c99dfed75e831"
 *                   game_id:
 *                     type: integer
 *                     example: 3918224
 *                   competition_id:
 *                     type: string
 *                     example: "DFB"
 *                   season:
 *                     type: integer
 *                     example: 2022
 *                   round:
 *                     type: string
 *                     example: "Second Round"
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2022-10-18T22:00:00.000Z"
 *                   home_club_id:
 *                     type: integer
 *                     example: 79
 *                   away_club_id:
 *                     type: integer
 *                     example: 10
 *                   home_club_goals:
 *                     type: integer
 *                     example: 6
 *                   away_club_goals:
 *                     type: integer
 *                     example: 0
 *                   home_club_manager_name:
 *                     type: string
 *                     example: "Michael Wimmer"
 *                   away_club_manager_name:
 *                     type: string
 *                     example: "Daniel Scherning"
 *                   stadium:
 *                     type: string
 *                     example: "Mercedes-Benz Arena"
 *                   attendance:
 *                     type: integer
 *                     example: 24500
 *                   referee:
 *                     type: string
 *                     example: "Robert Hartmann"
 *                   url:
 *                     type: string
 *                     example: "https://www.transfermarkt.co.uk/spielbericht/index/spielbericht/3918224"
 *                   home_club_name:
 *                     type: string
 *                     example: "Verein für Bewegungsspiele Stuttgart 1893"
 *                   away_club_name:
 *                     type: string
 *                     example: "Arminia Bielefeld"
 *                   aggregate:
 *                     type: string
 *                     example: "6:0"
 *                   competition_type:
 *                     type: string
 *                     example: "domestic_cup"
 *                   competition_name:
 *                     type: string
 *                     example: "dfb-pokal"
 *             example: [
 *               {
 *                 "_id": "666ac838a35c99dfed75e831",
 *                 "game_id": 3918224,
 *                 "competition_id": "DFB",
 *                 "season": 2022,
 *                 "round": "Second Round",
 *                 "date": "2022-10-18T22:00:00.000Z",
 *                 "home_club_id": 79,
 *                 "away_club_id": 10,
 *                 "home_club_goals": 6,
 *                 "away_club_goals": 0,
 *                 "home_club_manager_name": "Michael Wimmer",
 *                 "away_club_manager_name": "Daniel Scherning",
 *                 "stadium": "Mercedes-Benz Arena",
 *                 "attendance": 24500,
 *                 "referee": "Robert Hartmann",
 *                 "url": "https://www.transfermarkt.co.uk/spielbericht/index/spielbericht/3918224",
 *                 "home_club_name": "Verein für Bewegungsspiele Stuttgart 1893",
 *                 "away_club_name": "Arminia Bielefeld",
 *                 "aggregate": "6:0",
 *                 "competition_type": "domestic_cup",
 *                 "competition_name": "dfb-pokal"
 *               }
 *             ]
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/api/getgamesbyclubnseason', async (req, res) => {
  const { club_id, season } = req.body;
  try {
    const response = await fetch('http://localhost:3002/api/getbyclubnseason', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ club_id, season })
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch games: ${response.statusText}`;
      console.error(errorMessage);
      return res.status(response.status).json({ message: errorMessage });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});




/**
 * @swagger
 * /api/playerbyid:
 *   post:
 *     summary: Get player information by ID
 *     description: Fetches details of a specific player by their ID from an external service.
 *     tags:
 *       - Data Player
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               player:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Player details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 playerId:
 *                   type: integer
 *                   example: 10
 *                 firstName:
 *                   type: string
 *                   example: "Miroslav"
 *                 lastName:
 *                   type: string
 *                   example: "Klose"
 *                 name:
 *                   type: string
 *                   example: "Miroslav Klose"
 *                 lastSeason:
 *                   type: integer
 *                   example: 2015
 *                 currentClubId:
 *                   type: object
 *                   properties:
 *                     clubId:
 *                       type: integer
 *                       example: 398
 *                     clubCode:
 *                       type: string
 *                       example: "lazio-rom"
 *                     name:
 *                       type: string
 *                       example: "Società Sportiva Lazio S.p.A."
 *                     domesticCompetition:
 *                       type: object
 *                       properties:
 *                         competitionId:
 *                           type: string
 *                           example: "IT1"
 *                         competitionCode:
 *                           type: string
 *                           example: "serie-a"
 *                         name:
 *                           type: string
 *                           example: "serie-a"
 *                         subType:
 *                           type: string
 *                           example: "first_tier"
 *                         type:
 *                           type: string
 *                           example: "domestic_league"
 *                         countryId:
 *                           type: integer
 *                           example: 75
 *                         countryName:
 *                           type: string
 *                           example: "Italy"
 *                         domesticLeagueCode:
 *                           type: string
 *                           example: "IT1"
 *                         confederation:
 *                           type: string
 *                           example: "europa"
 *                         url:
 *                           type: string
 *                           example: "https://www.transfermarkt.co.uk/serie-a..."
 *                     totalMarketValue:
 *                       type: string
 *                       example: null
 *                     squadSize:
 *                       type: integer
 *                       example: 29
 *                     averageAge:
 *                       type: number
 *                       example: 27.4
 *                     foreignersNumber:
 *                       type: integer
 *                       example: 17
 *                     foreignersPercentage:
 *                       type: number
 *                       example: 58.6
 *                     nationalTeamPlayers:
 *                       type: integer
 *                       example: 11
 *                     stadiumName:
 *                       type: string
 *                       example: "Olimpico di Roma"
 *                     stadiumSeats:
 *                       type: integer
 *                       example: 73261
 *                     netTransferRecord:
 *                       type: string
 *                       example: "+€10.44m"
 *                     coachName:
 *                       type: string
 *                       example: null
 *                     lastSeason:
 *                       type: integer
 *                       example: 2023
 *                     url:
 *                       type: string
 *                       example: "https://www.transfermarkt.co.uk/lazio-rom..."
 *                 playerCode:
 *                   type: string
 *                   example: "miroslav-klose"
 *                 countryOfBirth:
 *                   type: string
 *                   example: "Poland"
 *                 cityOfBirth:
 *                   type: string
 *                   example: "Opole"
 *                 countryOfCitizenship:
 *                   type: string
 *                   example: "Germany"
 *                 dateOfBirth:
 *                   type: string
 *                   format: date
 *                   example: "1978-06-09"
 *                 subPosition:
 *                   type: string
 *                   example: "Centre-Forward"
 *                 position:
 *                   type: string
 *                   example: "Attack"
 *                 foot:
 *                   type: string
 *                   example: "right"
 *                 heightInCm:
 *                   type: integer
 *                   example: 184
 *                 marketValueInEur:
 *                   type: string
 *                   example: null
 *                 highestMarketValueInEur:
 *                   type: integer
 *                   example: 30000000
 *                 contractExpirationDate:
 *                   type: string
 *                   example: null
 *                 agentName:
 *                   type: string
 *                   example: "ASBW Sport Marketing"
 *                 imageUrl:
 *                   type: string
 *                   example: "https://img.a.transfermarkt.technology/portrait/header/10-1448468291.jpg?lm=1"
 *                 url:
 *                   type: string
 *                   example: "https://www.transfermarkt.co.uk/miroslav-klose..."
 *                 currentClubDomesticCompetitionId:
 *                   type: object
 *                   properties:
 *                     competitionId:
 *                       type: string
 *                       example: "IT1"
 *                     competitionCode:
 *                       type: string
 *                       example: "serie-a"
 *                     name:
 *                       type: string
 *                       example: "serie-a"
 *                     subType:
 *                       type: string
 *                       example: "first_tier"
 *                     type:
 *                       type: string
 *                       example: "domestic_league"
 *                     countryId:
 *                       type: integer
 *                       example: 75
 *                     countryName:
 *                       type: string
 *                       example: "Italy"
 *                     domesticLeagueCode:
 *                       type: string
 *                       example: "IT1"
 *                     confederation:
 *                       type: string
 *                       example: "europa"
 *                     url:
 *                       type: string
 *                       example: "https://www.transfermarkt.co.uk/serie-a..."
 *                 currentClubName:
 *                   type: string
 *                   example: "SS Lazio"
 *             example: [
 *               {
 *                 "playerId": 10,
 *                 "firstName": "Miroslav",
 *                 "lastName": "Klose",
 *                 "name": "Miroslav Klose",
 *                 "lastSeason": 2015,
 *                 "currentClubId": {
 *                   "clubId": 398,
 *                   "clubCode": "lazio-rom",
 *                   "name": "Società Sportiva Lazio S.p.A.",
 *                   "domesticCompetition": {
 *                     "competitionId": "IT1",
 *                     "competitionCode": "serie-a",
 *                     "name": "serie-a",
 *                     "subType": "first_tier",
 *                     "type": "domestic_league",
 *                     "countryId": 75,
 *                     "countryName": "Italy",
 *                     "domesticLeagueCode": "IT1",
 *                     "confederation": "europa",
 *                     "url": "https://www.transfermarkt.co.uk/serie-a..."
 *                   },
 *                   "totalMarketValue": null,
 *                   "squadSize": 29,
 *                   "averageAge": 27.4,
 *                   "foreignersNumber": 17,
 *                   "foreignersPercentage": 58.6,
 *                   "nationalTeamPlayers": 11,
 *                   "stadiumName": "Olimpico di Roma",
 *                   "stadiumSeats": 73261,
 *                   "netTransferRecord": "+€10.44m",
 *                   "coachName": null,
 *                   "lastSeason": 2023,
 *                   "url": "https://www.transfermarkt.co.uk/lazio-rom..."
 *                 },
 *                 "playerCode": "miroslav-klose",
 *                 "countryOfBirth": "Poland",
 *                 "cityOfBirth": "Opole",
 *                 "countryOfCitizenship": "Germany",
 *                 "dateOfBirth": "1978-06-09",
 *                 "subPosition": "Centre-Forward",
 *                 "position": "Attack",
 *                 "foot": "right",
 *                 "heightInCm": 184,
 *                 "marketValueInEur": null,
 *                 "highestMarketValueInEur": 30000000,
 *                 "contractExpirationDate": null,
 *                 "agentName": "ASBW Sport Marketing",
 *                 "imageUrl": "https://img.a.transfermarkt.technology/portrait/header/10-1448468291.jpg?lm=1",
 *                 "url": "https://www.transfermarkt.co.uk/miroslav-klose...",
 *                 "currentClubDomesticCompetitionId": {
 *                   "competitionId": "IT1",
 *                   "competitionCode": "serie-a",
 *                   "name": "serie-a",
 *                   "subType": "first_tier",
 *                   "type": "domestic_league",
 *                   "countryId": 75,
 *                   "countryName": "Italy",
 *                   "domesticLeagueCode": "IT1",
 *                   "confederation": "europa",
 *                   "url": "https://www.transfermarkt.co.uk/serie-a..."
 *                 },
 *                 "currentClubName": "SS Lazio"
 *               }
 *             ]
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/api/playerbyid', async (req, res) => {
  const { player } = req.body;
  try {
    const response = await fetch('http://localhost:8082/playerbyid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId: player })
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch player information: ${response.statusText}`;
      console.error(errorMessage);
      return res.status(response.status).json({ message: errorMessage });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});




/**
 * @swagger
 * /api/getgames:
 *   get:
 *     summary: Get list of games
 *     description: Fetches a list of games from an external service.
 *     tags:
 *       - Data Game
 *     responses:
 *       200:
 *         description: List of games retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   game_id:
 *                     type: integer
 *                     example: 4171248
 *                   name:
 *                     type: string
 *                     example: "Società Sportiva Calcio Napoli vs Real Madrid Club de Fútbol"
 *             example: [
 *               {
 *                 "game_id": 4171248,
 *                 "name": "Società Sportiva Calcio Napoli vs Real Madrid Club de Fútbol"
 *               }
 *             ]
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/api/getgames', async (req, res, next) => {
  try {
    const response = await fetch('http://localhost:3002/api/getgames');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});



/**
 * @swagger
 * /api/careerbyplayerid:
 *   post:
 *     summary: Get career details by player ID
 *     description: Fetches career details for a specific player by their ID from an external service.
 *     tags:
 *       - Data Career
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               player:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Career details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "666ee2550bcb24346618d908"
 *                   player_id:
 *                     type: integer
 *                     example: 10
 *                   club_id:
 *                     type: integer
 *                     example: 398
 *                   game_id:
 *                     type: integer
 *                     example: 2254965
 *                   player_name:
 *                     type: string
 *                     example: "Miroslav Klose"
 *                   competition_id:
 *                     type: string
 *                     example: "ELQ"
 *                   yellow_cards:
 *                     type: integer
 *                     example: 19
 *                   red_cards:
 *                     type: integer
 *                     example: 0
 *                   goals:
 *                     type: integer
 *                     example: 48
 *                   assists:
 *                     type: integer
 *                     example: 24
 *                   minutes_played:
 *                     type: integer
 *                     example: 8808
 *                   season:
 *                     type: integer
 *                     example: 2012
 *                   club_name:
 *                     type: string
 *                     example: "Società Sportiva Lazio S.p.A."
 *                   competition_name:
 *                     type: string
 *                     example: "europa-league-qualifikation"
 *             example: [
 *               {
 *                 "_id": "666ee2550bcb24346618d908",
 *                 "player_id": 10,
 *                 "club_id": 398,
 *                 "game_id": 2254965,
 *                 "player_name": "Miroslav Klose",
 *                 "competition_id": "ELQ",
 *                 "yellow_cards": 19,
 *                 "red_cards": 0,
 *                 "goals": 48,
 *                 "assists": 24,
 *                 "minutes_played": 8808,
 *                 "season": 2012,
 *                 "club_name": "Società Sportiva Lazio S.p.A.",
 *                 "competition_name": "europa-league-qualifikation"
 *               }
 *             ]
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/api/careerbyplayerid', async (req, res) => {
  const { player } = req.body;
  try {
    const response = await fetch('http://localhost:3002/api/careerbyplayerid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player_id: player })
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch career details: ${response.statusText}`;
      console.error(errorMessage);
      return res.status(response.status).json({ message: errorMessage });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});




/**
 * @swagger
 * /api/getranking:
 *   post:
 *     summary: Get rankings by competition ID and season
 *     description: Fetches the rankings for a specific competition and season from an external service.
 *     tags:
 *       - Data Ranking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               competition_id:
 *                 type: string
 *                 example: "CIT"
 *               season:
 *                 type: integer
 *                 example: 2023
 *     responses:
 *       200:
 *         description: Rankings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "666f45cd0bcb2434661997ec"
 *                   competition_id:
 *                     type: string
 *                     example: "CIT"
 *                   season:
 *                     type: integer
 *                     example: 2023
 *                   club_id:
 *                     type: integer
 *                     example: 1390
 *                   club_name:
 *                     type: string
 *                     example: "Cagliari Calcio"
 *                   club_goals_home:
 *                     type: integer
 *                     example: 2
 *                   win_home:
 *                     type: integer
 *                     example: 1
 *                   loss_home:
 *                     type: integer
 *                     example: 0
 *                   points_home:
 *                     type: integer
 *                     example: 3
 *                   home_games:
 *                     type: integer
 *                     example: 1
 *                   club_goals_away:
 *                     type: integer
 *                     example: 2
 *                   win_away:
 *                     type: integer
 *                     example: 1
 *                   loss_away:
 *                     type: integer
 *                     example: 0
 *                   points_away:
 *                     type: integer
 *                     example: 3
 *                   away_games:
 *                     type: integer
 *                     example: 1
 *                   tie:
 *                     type: integer
 *                     example: 0
 *                   total_goals:
 *                     type: integer
 *                     example: 4
 *                   total_win:
 *                     type: integer
 *                     example: 2
 *                   total_loss:
 *                     type: integer
 *                     example: 0
 *                   total_points:
 *                     type: integer
 *                     example: 6
 *                   total_games:
 *                     type: integer
 *                     example: 2
 *             example: [
 *               {
 *                 "_id": "666f45cd0bcb2434661997ec",
 *                 "competition_id": "CIT",
 *                 "season": 2023,
 *                 "club_id": 1390,
 *                 "club_name": "Cagliari Calcio",
 *                 "club_goals_home": 2,
 *                 "win_home": 1,
 *                 "loss_home": 0,
 *                 "points_home": 3,
 *                 "home_games": 1,
 *                 "club_goals_away": 2,
 *                 "win_away": 1,
 *                 "loss_away": 0,
 *                 "points_away": 3,
 *                 "away_games": 1,
 *                 "tie": 0,
 *                 "total_goals": 4,
 *                 "total_win": 2,
 *                 "total_loss": 0,
 *                 "total_points": 6,
 *                 "total_games": 2
 *               }
 *             ]
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post('/api/getranking', async (req, res) => {
  const { competition_id, season } = req.body;
  try {
    const response = await fetch('http://localhost:3002/api/getrankings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ competition_id, season })
    });

    if (!response.ok) {
      const errorMessage = `Failed to fetch rankings: ${response.statusText}`;
      console.error(errorMessage);
      return res.status(response.status).json({ message: errorMessage });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});


module.exports = router;