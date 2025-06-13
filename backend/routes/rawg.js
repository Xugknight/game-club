const express = require('express');
const router = express.Router();
const { searchGames, trendingGames } = require('../controllers/rawg');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

router.get('/games', searchGames);
router.get('/games/trending', trendingGames);

module.exports = router;