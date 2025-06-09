const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/games'

// Protect all defined routes
// router.use(ensureLoggedIn);

// GET /api/games/:gameId/reviews (INDEX action)
router.get('/:gameId/reviews', reviewsCtrl.index);
// POST /api/games/:gameId/reviews (CREATE action)
router.post('/:gameId/reviews', reviewsCtrl.create);
// PUT /api/games/:gameId/reviews/:reviewId (UPDATE action)
router.post('/:gameId/reviews/:reviewId', reviewsCtrl.update);
// DELETE /api/games/:gameId/reviews/:reviewId  (DELETE action)
router.post('/:gameId/reviews/:reviewId', reviewsCtrl.delete);

module.exports = router;