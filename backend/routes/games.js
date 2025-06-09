const express = require('express');
const router = express.Router();
const gamesCtrl = require('../controllers/games');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/games'

// Protect all defined routes
// router.use(ensureLoggedIn);

// GET /api/games (INDEX action)
router.get('/', gamesCtrl.index);
// POST /api/games (CREATE action)
router.post('/', gamesCtrl.create);
// GET /api/games/:gameId (SHOW action)
router.post('/:gameId', gamesCtrl.show);
// PUT /api/games/:gameId (UPDATE action)
router.post('/:gameId', gamesCtrl.update);
// DELETE /api/games/:gameId  (DELETE action)
router.post('/:gameId', gamesCtrl.delete);

module.exports = router;