process.env.NODE_ENV = 'test';
process.env.PORT = 8080;
require('../bin/www');

// Validation Tests
require('./validation-tests/enter-gamer-tag');
require('./validation-tests/find-players-or-game');
require('./validation-tests/create-a-game');

/* eslint-enable max-nested-callbacks */
