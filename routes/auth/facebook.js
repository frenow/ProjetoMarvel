const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('facebook'));

router.get('/callback', passport.authenticate('facebook', {failureRedirect: '/login'} ), (req, res) => {
    res.redirect('/profile');
})

module.exports = router;