process.env.NODE_ENV = 'test';
process.env.PORT = 8080;

require('../bin/www');
const mongoose = require('mongoose');

const Game = mongoose.model('Game');
mongoose.Promise = global.Promise;

describe('Validation tests', () => {
  before(done => {
    Game.remove({})
    .then(() => {
      done();
    })
    .catch(err => {
      console.log(err);
    });
  });

  after(done => {
    done();
  });

  // Validation Tests
  require('./validation-tests/enter-gamer-tag');
  require('./validation-tests/find-players-or-game');
  require('./validation-tests/create-a-game');
  require('./validation-tests/find-a-game');
});

/* eslint-enable max-nested-callbacks */
