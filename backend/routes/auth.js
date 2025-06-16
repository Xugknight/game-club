const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

// All paths start with '/api/auth'

router.post('/signup', authCtrl.signUp);
router.post('/login', authCtrl.logIn);

module.exports = router;