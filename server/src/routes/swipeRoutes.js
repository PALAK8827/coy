const express = require('express');
const router = express.Router();
const {
  getFeed,
  handleSwipe,
  getMatches,
  getStats,
  handleReset
} = require('../controllers/swipeController');

// Main Assignment APIs
router.get('/feed', getFeed);
router.post('/swipe', handleSwipe);
router.get('/matches', getMatches);

// Utility endpoints
router.get('/stats', getStats);
router.post('/reset', handleReset);

module.exports = router;
