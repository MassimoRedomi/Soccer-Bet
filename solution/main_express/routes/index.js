const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const fetch = require('node-fetch');
const saltRounds = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});


router.get('/api/soccer-nations', async (req, res, next) => {
  try {
    const response = await fetch('http://localhost:8082/soccer-nations');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/api/clubs-names', async (req, res, next) => {
  try {
    const response = await fetch('http://localhost:8082/clubs-names');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/api/champions', async (req, res, next) => {
  try {
    const response = await fetch('http://localhost:8082/champions-flags');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/api/news', async (req, res) => {
  const url = 'https://newsapi.org/v2/everything?q=soccers&apiKey=b23fb742555545c790405871f8795e39';

  try {
    const apiResponse = await fetch(url);
    const data = await apiResponse.json();  // Parse the JSON from the API response
    res.json(data);  // Send data to the client
  } catch (error) {
    console.error("Failed to fetch news:", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

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

router.post('/api/signup', async (req, res) => {
  try{
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
  } catch(error){
    console.error('Error posting user and password:', error);
    res.status(500).json({ message: 'Error sending signup information' });
  }
});

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

router.get('/api/check-login', (req, res) => {
  try {
    const isLoggedIn = !!req.session.isLoggedIn;
    res.json({ isLoggedIn });
  } catch (error) {
    console.error('Failed to check login status:', error);
    res.status(500).json({ message: 'Internal Server Error', details: error.message });
  }
});

router.get('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log('Session destruction error:', err);
      return res.status(500).send('Failed to log out.');
    }
    res.send('OK');
  });
});


router.get('/api/userinfo', (req, res) => {
  if (req.session.isLoggedIn) {
    const userEmail = req.session.userEmail;
    res.json(userEmail);
  } else {
    res.status(401).json({ message: "Unauthorized access. Please log in." });
  }
});
module.exports = router;
