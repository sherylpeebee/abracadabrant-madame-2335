var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'thisisabadsecret', resave: true, saveUninitialized: true }));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

var router = require('./routes/index')(passport);
app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

// export CALLBACK_URL="https://abracadabrant-madame-2335.herokuapp.com/auth/twitter/callback"
// export CONSUMER_KEY="qmuAQP5Ne7N38z9ijiZQNjwoz"
// export CONSUMER_SECRET="nbsxZVCPx7pxZPuCWA06R69rm4f4eKbn2jNp8jGBFJRoKBSFVx"
// export MONGOLAB_URI="mongodb://heroku_94rc8k4r:bqs2rg2d2f28arh9oq6snqvi4g@ds047632.mongolab.com:47632/heroku_94rc8k4r"
