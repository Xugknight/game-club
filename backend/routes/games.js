const express = require('express');
const router = express.Router();
const gamesCtrl = require('../controllers/games');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/games'

// Public Routes
router.get('/', gamesCtrl.index);
router.get('/:gameId', gamesCtrl.show);

// Protected Routes
router.post('/', ensureLoggedIn, gamesCtrl.create);
router.put('/:gameId', ensureLoggedIn, gamesCtrl.update);
router.delete('/:gameId', ensureLoggedIn, gamesCtrl.delete);

module.exports = router;