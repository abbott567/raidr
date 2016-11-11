require('marko/node-require').install();

const path = require('path');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/db-connect');

const app = express();

// MongoDB
mongoose.connect(db);
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
