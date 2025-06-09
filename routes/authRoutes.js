const express = require('express');
const router = express.Router();
const auth = require('../controlers/authController');
const user = require('../controlers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

// Registration
router.get('/register', (req, res) => {
  res.render('register', { error: null, success: null }); // pass empty values
});
router.post('/register', auth.register);

// Login
router.get('/login', (req, res) => {
  res.render('login', { error: null }); // pass empty value for error
});
router.post('/login', auth.login);

// Profile
router.get('/profile', verifyToken, user.profile);

// Logout
router.get('/logout', auth.logout);

module.exports = router;
