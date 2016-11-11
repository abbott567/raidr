const Browser = require('zombie');

/* eslint-disable max-nested-callbacks */
describe('- Find players or game screen', () => {
  let browser;

  before(done => {
    browser = new Browser();
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
  });
});

/* eslint-enable max-nested-callbacks */
