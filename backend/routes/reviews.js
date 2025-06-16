const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api'

// Public Route
router.get('/games/:gameId/reviews', reviewsCtrl.index);

// Protected Routes
router.post('/games/:gameId/reviews', ensureLoggedIn, reviewsCtrl.create);
router.put('/games/:gameId/reviews/:reviewId', ensureLoggedIn, reviewsCtrl.update);
router.delete('/games/:gameId/reviews/:reviewId', ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;