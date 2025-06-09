const db = require('../db/db');

exports.profile = async (req, res) => {
  try {
    const user = await db.query('SELECT id, username, email, created_at FROM users WHERE id = $1', [req.user.id]);
    res.render('profile', { user: user.rows[0] });
  } catch (err) {
    res.redirect('/login?error=Could not load profile');
  }
};
