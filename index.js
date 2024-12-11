const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// POST route to handle queries
app.post('/query', async (req, res) => {
  const userQuery = req.body.query;
  
  if (!userQuery) {
    return res.status(400).send({ error: 'Query is required' });
  }

  try {
    // Make a POST request to SpreadHeats AI API
    const response = await axios.post(
      'https://api.spreadheats.ai/endpoint', // Replace with actual API endpoint
      { query: userQuery },
      {
        headers: {
          'Authorization': `Bearer ${process.env.SPREADHEATS_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Send back the response from SpreadHeats AI
    res.json(response.data);
  } catch (error) {
    console.error('Error querying SpreadHeats AI:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
