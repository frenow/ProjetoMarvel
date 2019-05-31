const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new SteamStrategy({
    //localhost config
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: '393F1A92FECF7244D96EBD6B832C3F8E'
    //heroku config 
    //returnURL: 'https://projetomarvel.herokuapp.com/auth/steam/return',
    //realm: 'https://projetomarvel.herokuapp.com/',
    //apiKey: '393F1A92FECF7244D96EBD6B832C3F8E' //talvez não funcione por que só pode registrar
                                                //uma chave por conta e a chave só pode ser vinculada
                                                //à um domínio

  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));