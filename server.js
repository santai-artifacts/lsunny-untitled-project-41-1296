const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/apod', async (req, res) => {
  try {
    const date = req.query.date ? `&date=${req.query.date}` : '';
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}${date}`;
    const response = await fetch(url);
    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.msg || 'NASA API error' });
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from NASA API' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`NASA APOD server running on port ${PORT}`);
});
