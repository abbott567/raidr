process.env.NODE_ENV = 'test';
process.env.PORT = 8080;
require('../bin/www');
const Browser = require('zombie');

Browser.localhost('raidr.herokuapp.com', process.env.PORT);

/* eslint-disable no-undef */
describe('Enter gamertag screen', () => {
  const browser = new Browser();
  before(function (done) {
    browser.visit('/', done);
  });

  it('should have a status of 200', () => {
    browser.assert.success();
  });

  it('It should be the enter your details page"', () => {
    browser.assert.text('h2', 'Enter your details');
    browser.assert.element('#player-info');
  });

  it('should have the element input#gamertag', () => {
    browser.assert.element('#gamertag');
  });

  it('should have two elements input[name="platform"]', () => {
    browser.assert.elements('input[name="platform"]', 2);
  });

  it('should have the element select[name="language"]', () => {
    browser.assert.element('select[name="language"]');
  });

  it('should throw two errors when submitted and gamertag is blank and platform is not selected', () => {
    browser.pressButton('button[type="submit"]');
    browser.assert.element('#errors');
  });

  it('should throw one error when submitted and platform is not selected', () => {
    browser.fill('#gamertag', 'abbott567');
    browser.pressButton('button[type="submit"]');
    browser.assert.element('#errors');
  });

  it('should throw one error when submitted and gamertag is blank', () => {
    browser.fill('#gamertag', '');
    browser.choose('#playstation');
    browser.pressButton('button[type="submit"]');
    browser.assert.element('#errors');
  });

  it('should load the next page if all valid', () => {
    browser.fill('#gamertag', 'abbott567');
    browser.choose('#playstation');
    browser.pressButton('button[type="submit"]');
    setTimeout(() => {
      browser.assert.element('#find-type');
    }, 5);
  });
});

/* eslint-enable no-undef */
