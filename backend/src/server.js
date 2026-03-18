// Purpose: Express server setup and API route mounting.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const streamingRoutes = require('./routes/streamingRoutes');
const { initializeBatchScheduler } = require('./jobs/imdbRatingBatcher');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API routes first
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Server is running' }));
app.use('/api', streamingRoutes);

// Serve Vite frontend
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Start daily IMDB rating preloader
  initializeBatchScheduler();
});