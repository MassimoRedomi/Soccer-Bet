const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

/* GET JSON data for soccer nations. */
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

module.exports = router;
