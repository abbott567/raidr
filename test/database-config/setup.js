const mongoose = require('mongoose');

const Game = mongoose.model('Game');
mongoose.Promise = global.Promise;

describe('Set up database', () => {
  before(done => {
    Game.remove({})
    .then(() => {
      done();
    })
    .catch(err => {
      console.log(err);
    });
  });
  it('should be clear database', () => {});
});
