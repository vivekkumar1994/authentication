const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const db = require('../db/db');
require('dotenv').config();

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
  
    // Basic validation
    if (!email.includes('@') || password.length < 8)
      return res.render('register', { error: 'Invalid email or password', success: null });
  
    try {
      const userCheck = await db.query(
        'SELECT * FROM users WHERE email = $1 OR username = $2',
        [email, username]
      );
  
      if (userCheck.rows.length)
        return res.render('register', { error: 'Email or Username already exists', success: null });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query(
        'INSERT INTO users(username, email, password) VALUES ($1, $2, $3)',
        [username, email, hashedPassword]
      );
  
      // On success, pass error as null
      res.render('register', { success: 'Registration successful. Please log in.', error: null });
    } catch (err) {
      console.error(err);
      res.render('register', { error: 'Server error. Try again.', success: null });
    }
  };
  

exports.login = async (req, res) => {
  const { username, password, 'g-recaptcha-response': token } = req.body;

  if (!token) return res.render('login', { error: 'reCAPTCHA not verified' });

  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
  const captchaRes = await axios.post(verifyURL);

  if (!captchaRes.data.success) return res.render('login', { error: 'Invalid reCAPTCHA' });

  try {
    const userRes = await db.query(
      'SELECT * FROM users WHERE username = $1 OR email = $1',
      [username]
    );
    if (!userRes.rows.length) return res.render('login', { error: 'User not found' });

    const user = userRes.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.render('login', { error: 'Incorrect password' });

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '15m'
    });

    res.cookie('token', token, { httpOnly: true });
    res.redirect('/profile');
  } catch (err) {
    res.render('login', { error: 'Server error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
