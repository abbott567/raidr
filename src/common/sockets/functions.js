const io = require('socket.io')();

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('accept game', () => {
    console.log('game accepted');
    socket.emit('moo');
  });

  socket.on('reject game', () => {
    console.log('game rejected');
  });
});

module.exports = io;
