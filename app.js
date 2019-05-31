var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

var indexRouter = require('./routes/index');
var personagensRouter = require('./routes/personagens');
var personagemRouter = require('./routes/personagem');
var usersRouter = require('./routes/users');
var insertfavoritosRouter = require('./routes/insertfavoritos');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var authRouter = require('./routes/auth');
var profileRouter = require('./routes/profile');

var app = express();
require('./configs/facebook.strategy');
require('./configs/steam.strategy');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set passport configs
app.use(require('express-session')({ secret: 'shhhh...', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/personagens', personagensRouter);
app.use('/personagem', personagemRouter);
app.use('/insertfavoritos', insertfavoritosRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
