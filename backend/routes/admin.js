const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const ensureAdmin = require('../middleware/ensureAdmin');
const adminCtrl = require('../controllers/admin');

router.use(ensureLoggedIn, ensureAdmin);

router.get('/flags', adminCtrl.getAllFlags);
router.delete('/flags/:flagId', adminCtrl.resolveFlag);

router.get('/games', adminCtrl.getAllGames);
router.delete('/games/:gameId', adminCtrl.deleteGame);

router.get('/reviews', adminCtrl.getAllReviews);
router.delete('/reviews/:reviewId', adminCtrl.deleteReview);

module.exports = router;