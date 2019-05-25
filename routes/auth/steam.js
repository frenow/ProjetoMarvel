const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/return',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect profile.
    res.redirect('/profile');
  });

  module.exports = router