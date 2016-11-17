const Browser = require('zombie');
const mongoose = require('mongoose');

const Game = mongoose.model('Game');

/* eslint-disable max-nested-callbacks */
describe('- Create a game screen', () => {
  let browser;

  before(done => {
    browser = new Browser({
      waitFor: 100000,
      maxWait: 800000
    });
    browser.visit(`http://localhost:${process.env.PORT}`)
    .then(() => {
      browser.fill('#gamertag', 'abbott567');
      browser.choose('#playstation');
      browser.pressButton('button[type="submit"]');
      return browser.wait();
    })
    .then(() => {
      browser.choose('#create');
      browser.pressButton('button[type="submit"]');
      return browser.wait();
    })
    .then(() => {
      done();
    });
  });

  describe('<> Page elements', () => {
    it('should have element form#create-a-game', done => {
      browser.assert.element('#create-a-game');
      done();
    });

    it('should have element select#raid', done => {
      browser.assert.element('select[name="raid"]');
      done();
    });

    it('should have element select#players', done => {
      browser.assert.elements('input[name="players"]', 5);
      done();
    });
  });

  describe('-> Form submitted', done => {
    it('should redirect to await-players on submit', () => {
      browser.choose('#one');
      browser.pressButton('button[type="submit"]');
      browser.wait(() => {
        browser.assert.text('h2', 'AWAIT PLAYERS');
        done();
      });
    });
  });
});

/* eslint-enable max-nested-callbacks */
