// userRoutes.js
const express = require('express');
const User = require('./models/user');
const passport = require('passport');
const isAdmin = require('./middlewares/authAdMiddleware');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
      const { username, password, role } = req.body;
      const user = new User({ username, role });
      await User.register(user, password);
      res.json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
  });
  
  router.post('/logout', (req, res) => {
    // Provide a callback function to req.logout
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error logging out' });
      }
      // Clear the session manually
      req.session.destroy((sessionErr) => {
        if (sessionErr) {
          return res.status(500).json({ error: 'Error destroying session' });
        }
        res.json({ message: 'Ok Logout successful' });
      });
    });
  });
  // Protected route accessible only to admins
  router.get('/admin/data', isAdmin, (req, res) => {
    res.json({ message: 'Admin-only data' });
  });
module.exports = router;