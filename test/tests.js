process.env.NODE_ENV = 'test';
process.env.PORT = 8080;
require('../bin/www');

const Browser = require('zombie');

/* eslint-disable max-nested-callbacks */
describe('- Tests', () => {
  const browser = new Browser();
  before(function (done) {
    browser.visit(`http://localhost:${process.env.PORT}`, done);
  });

  it('Browser should have a status of 200', done => {
    browser.assert.success();
    done();
  });

  describe('- Enter gamertag screen', () => {
    describe('- Page elements', () => {
      it('It should be the enter your details page"', done => {
        browser.assert.text('h2', 'Enter your details');
        browser.assert.element('#player-info');
        done();
      });

      it('should have the element input#gamertag', done => {
        browser.assert.element('#gamertag');
        done();
      });

      it('should have two elements input[name="platform"]', done => {
        browser.assert.elements('input[name="platform"]', 2);
        done();
      });

      it('should have the element select[name="language"]', done => {
        browser.assert.element('select[name="language"]');
        done();
      });
    });

    describe('- Validation', () => {
      it('should throw two errors gamertag is blank and platform is not selected', done => {
        browser.pressButton('button[type="submit"]');
        browser.assert.element('#errors');
        done();
      });

      it('should throw one error when platform is not selected', done => {
        browser.fill('#gamertag', 'abbott567');
        browser.pressButton('button[type="submit"]');
        browser.assert.element('#errors');
        done();
      });

      it('should throw one error when gamertag is blank', done => {
        browser.fill('#gamertag', '');
        browser.choose('#playstation');
        browser.pressButton('button[type="submit"]');
        browser.assert.element('#errors');
        done();
      });

      it('should load the next page if all valid', done => {
        browser.fill('#gamertag', 'abbott567');
        browser.choose('#playstation');
        browser.pressButton('button[type="submit"]');
        browser.wait()
        .then(() => {
          browser.assert.element('#find-type');
          done();
        });
      });
    });
  });

  describe('- Find players or game screen', () => {
    it('should have the element form#find-type', done => {
      browser.assert.element('#find-type');
      done();
    });
  });
});

/* eslint-enable max-nested-callbacks */
