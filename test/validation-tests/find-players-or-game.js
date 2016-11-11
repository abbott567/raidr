const Browser = require('zombie');

/* eslint-disable max-nested-callbacks */
describe('- Find players or game screen', () => {
  let browser;

  beforeEach(done => {
    browser = new Browser();
    browser.visit(`http://localhost:${process.env.PORT}`)
    .then(() => {
      browser.fill('#gamertag', 'abbott567');
      browser.choose('#playstation');
      browser.pressButton('button[type="submit"]');
      return browser.wait();
    })
    .then(() => {
      done();
    });
  });

  describe('</> Page elements', () => {
    it('should have the element form#find-type', done => {
      browser.assert.element('#find-type');
      done();
    });

    it('should have two elements input[name="find-type-select"]', done => {
      browser.assert.elements('input[name="find-type-select"]', 2);
      done();
    });
  });

  describe('* Validation', () => {
    it('should throw one error if no game-type selected', done => {
      browser.pressButton('button[type="submit"]');
      browser.assert.element('#errors');
      browser.assert.elements('#errors li', 1);
      done();
    });
  });

  describe('-> I want to find players for my fireteam', () => {
    it('should load create-a-game page if create radio is chosen', done => {
      browser.choose('#create');
      browser.pressButton('button[type="submit"]');
      browser.wait()
      .then(() => {
        browser.assert.element('#create-a-game');
        done();
      });
    });
  });

  describe('-> I want to find a fireteam to join', () => {
    it('should load find-a-game page if a radio is chosen', done => {
      browser.choose('#find');
      browser.pressButton('button[type="submit"]');
      browser.wait()
      .then(() => {
        browser.assert.element('#which-raid');
        done();
      });
    });
  });
});

/* eslint-enable max-nested-callbacks */
