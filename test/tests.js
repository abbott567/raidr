process.env.NODE_ENV = 'test';

require('../bin/www');

/* eslint-disable no-undef */

describe('enter-gamertag', () => {
  require('../src/pages/enter-gamertag/tests');
});

describe('choose-fireteam-options', () => {
  require('../src/pages/choose-fireteam-options/tests');
});

describe('which-raid-solo', () => {
  require('../src/pages/which-raid-solo/tests');
});

/* eslint-enable no-undef */
