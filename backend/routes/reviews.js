const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api'

// Protect all defined routes
// router.use(ensureLoggedIn);

// Public Route
// GET /api/games/:gameId/reviews (INDEX action)
router.get('/games/:gameId/reviews', reviewsCtrl.index);

// Protected Routes
// POST /api/games/:gameId/reviews (CREATE action)
router.post('/games/:gameId/reviews', ensureLoggedIn, reviewsCtrl.create);
// PUT /api/games/:gameId/reviews/:reviewId (UPDATE action)
router.put('/games/:gameId/reviews/:reviewId', ensureLoggedIn, reviewsCtrl.update);
// DELETE /api/games/:gameId/reviews/:reviewId  (DELETE action)
router.delete('/games/:gameId/reviews/:reviewId', ensureLoggedIn, reviewsCtrl.delete);

module.exports = router;