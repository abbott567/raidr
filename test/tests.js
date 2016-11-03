process.env.NODE_ENV = 'test';

require('../bin/www');

/* eslint-disable no-undef */

describe('API calls / functions', () => {
  require('../src/pages/enter-gamertag/tests');
});

/* eslint-enable no-undef */
