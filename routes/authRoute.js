const express = require('express');
const {signup, login} = require('../controllers/authController');

const router = express.Router();

// Signup route
router.post('/signup', signup);

module.exports = router;
