const Browser = require('zombie');

/* eslint-disable max-nested-callbacks */
describe('- Find a game screen', () => {
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
      browser.choose('#find');
      browser.pressButton('button[type="submit"]');
      return browser.wait();
    })
    .then(() => {
      done();
    });
  });

  describe('<> Page elements', () => {
    it('should have element form#which-raid', done => {
      browser.assert.element('#which-raid');
      done();
    });
  });
});

/* eslint-enable max-nested-callbacks */
