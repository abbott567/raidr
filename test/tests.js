process.env.NODE_ENV = 'test';

require('../bin/www');
/* eslint-disable no-undef */

describe('enter-gamertag', function () {
  this.timeout(5000);
  require('../src/pages/enter-gamertag/tests');
});

describe('choose-fireteam-options', function () {
  this.timeout(5000);
  require('../src/pages/choose-fireteam-options/tests');
});

describe('find-players', function () {
  this.timeout(5000);
  require('../src/pages/find-players/tests');
});

describe('find-a-team', function () {
  this.timeout(5000);
  require('../src/pages/find-a-team/tests');
});

describe('show-raid-team', function () {
  this.timeout(5000);
  require('../src/pages/show-raid-team/tests');
});

/* eslint-enable no-undef */
