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
  try {
    const email = req.body.email;
    const password = req.body.password;
    const response = await fetch('http://localhost:8082/get-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userMail: email })
    });

    const user = await response.json();

    if (response.status !== 200) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({ message: 'OK' });
    } else {
      res.status(401).json({ message: "Can't continue with auth because passwords aren't equal" });
    }
  } catch (error) {
    console.error('Error posting user', error);
    res.status(500).json({ message: 'Error sending login information' });
  }
});

module.exports = router;
