const express = require('express');
const { getStreaming } = require('../controllers/streamingController');

const router = express.Router();

router.get('/streaming', getStreaming);

module.exports = router;
