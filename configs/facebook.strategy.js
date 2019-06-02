const passport = require('passport');
const FaceBookbStrategy = require('passport-facebook').Strategy;

passport.use(new FaceBookbStrategy({
    //configs para localhost
    clientID: "449338872490395",
    clientSecret: "b25ba39f754668f409406315e54a1776",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    
    //configs para heroku
    //clientID: "649576658802936",
    //clientSecret: "6578e0add51c02af7c0252227e678771",
    //callbackURL: "https://projetomarvel.herokuapp.com/auth/facebook/callback",
    enableProof: true
},
function(accessToken, refreshToken, profile, cb) {
  return cb(undefined, profile);
}
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});