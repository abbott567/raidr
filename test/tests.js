process.env.NODE_ENV = 'test';
process.env.PORT = 8080;
require('../bin/www');

// Database setup
require('./database-config/setup');

// Validation Tests
require('./validation-tests/enter-gamer-tag');
require('./validation-tests/find-players-or-game');
require('./validation-tests/create-a-game');
require('./validation-tests/find-a-game');

/* eslint-enable max-nested-callbacks */
