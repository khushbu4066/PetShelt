// app.js
const express = require('express');
const mongoose = require('./db');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const userRoutes = require('./userRoutes');
const animalRoutes = require('./animalRoutes');
const User = require('./models/user');


const app = express();
const PORT = 4000;
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());


app.use(session({
  secret: 'xyzabcd',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRoutes);
app.use('/animals', animalRoutes);

// MongoDB schema for users


// Model creation

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
