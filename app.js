require('marko/node-require').install();

const path = require('path');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// MongoDB
mongoose.connect('mongodb://localhost/raidr');
mongoose.model('Game', require('./models/game').Game);

// Sockets
app.io = require('./src/common/sockets/functions');

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./src/pages/index/routes'));
app.use('/enter-gamertag', require('./src/pages/enter-gamertag/routes'));
app.use('/awaiting-orbit', require('./src/pages/awaiting-orbit/routes'));
app.use('/choose-fireteam-options', require('./src/pages/choose-fireteam-options/routes'));
app.use('/find-players', require('./src/pages/find-players/routes'));
app.use('/await-response', require('./src/pages/await-response/routes'));
app.use('/find-a-team', require('./src/pages/find-a-team/routes'));
app.use('/show-raid-team', require('./src/pages/show-raid-team/routes'));
app.use('/await-decision', require('./src/pages/await-decision/routes'));
app.use('/success-you-were-accepted', require('./src/pages/success-you-were-accepted/routes'));
app.use('/invite-player-to-your-game', require('./src/pages/invite-player-to-your-game/routes'));

// Routes for test API
app.use('/api', require('./test/api-routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
