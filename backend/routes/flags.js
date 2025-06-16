const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const flagCtrl = require('../controllers/flags');

router.use(ensureLoggedIn);

router.get('/games/:gameId',    flagCtrl.checkGameFlag);
router.get('/reviews/:reviewId', flagCtrl.checkReviewFlag);
router.post('/games/:gameId',    flagCtrl.flagGame);
router.post('/reviews/:reviewId',flagCtrl.flagReview);

module.exports = router;