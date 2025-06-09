const express = require('express');
const router = express.Router();
const gamesCtrl = require('../controllers/games');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/games'

// Protect all defined routes
// router.use(ensureLoggedIn);

// Public Routes
// GET /api/games (INDEX action)
router.get('/', gamesCtrl.index);
// GET /api/games/:gameId (SHOW action)
router.get('/:gameId', gamesCtrl.show);

// Protected Routes
// POST /api/games (CREATE action)
router.post('/', ensureLoggedIn, gamesCtrl.create);
// PUT /api/games/:gameId (UPDATE action)
router.put('/:gameId', ensureLoggedIn, gamesCtrl.update);
// DELETE /api/games/:gameId  (DELETE action)
router.delete('/:gameId', ensureLoggedIn, gamesCtrl.delete);

module.exports = router;