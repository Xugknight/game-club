const express = require('express');
const router = express.Router();
const { searchGames, trendingGames, importGame } = require('../controllers/rawg');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

router.get('/games', searchGames);
router.get('/games/trending', trendingGames);
router.post('/games/:rawgId/import', ensureLoggedIn, importGame);

module.exports = router;