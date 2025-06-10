const express = require('express');
const router = express.Router();
const { searchGames } = require('../controllers/rawg');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// GET /api/rawg 
router.get('/games', searchGames);

module.exports = router;