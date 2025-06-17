const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const usersCtrl = require('../controllers/users');

// All paths start with '/api/users'

// Public Route
router.get('/:userId', usersCtrl.getProfile);
router.get('/:userId/favorites', usersCtrl.getFavorites);

// Protected Routes
router.post('/:userId/favorites/:gameId', ensureLoggedIn, usersCtrl.addFavorite);
router.delete('/:userId/favorites/:gameId', ensureLoggedIn, usersCtrl.removeFavorite);

module.exports = router;