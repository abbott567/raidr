process.env.NODE_ENV = 'test';

require('../bin/www');

/* eslint-disable no-undef */

describe('enter-gamertag', () => {
  require('../src/pages/enter-gamertag/tests');
});

describe('choose-fireteam-options', () => {
  require('../src/pages/choose-fireteam-options/tests');
});

describe('find-players', () => {
  require('../src/pages/find-players/tests');
});

/* eslint-enable no-undef */
