const express = require('express');
const {signup, login, verifyEmail, forgotPassword, resetPassword} = require('../controllers/authController');

const router = express.Router();

// Signup route
router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);

module.exports = router;
