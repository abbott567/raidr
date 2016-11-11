let db;

if (process.env.NODE_ENV === 'test') {
  db = 'mongodb://localhost/raidr-test';
} else {
  db = 'mongodb://localhost/raidr';
}

module.exports = db;
