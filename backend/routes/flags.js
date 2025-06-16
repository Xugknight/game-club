const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const { flagGame, flagReview } = require('../controllers/flags');

router.post('/games/:gameId',   ensureLoggedIn, flagGame);
router.post('/reviews/:reviewId',ensureLoggedIn, flagReview);

module.exports = router;