module.exports = process.env.NODE_ENV === 'test' ? `http://localhost:8080/api/` : 'http://localhost:3000/api/';

