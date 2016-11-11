const io = require('socket.io')();
const mongoose = require('mongoose');

const Game = mongoose.model('Game');

io.on('connection', socket => {
  let cd;

  socket.on('create game', (host, raid, spaces) => {
    host.socketId = socket.id;

    const nGame = new Game({
      host,
      raid,
      spaces
    });

    nGame.save()
    .then(() => {
      socket.emit('game saved', true);
    })
    .catch(() => {
      socket.emit('game saved', false);
    });
  });

  socket.on('find a game', (player, raid, rejectedGames) => {
    // Find first game on connect
    return Game.findOne(
      {'host.language': player.language, 'raid': raid, 'spaces': {$gt: 0}, '_id': {$nin: rejectedGames}},
      'host spaces',
      {sort: {createdAt: 1}}
    )
    .then(game => {
      if (game) {
        game.spaces--;
        return Promise.all([game, game.save()]);
      }
      socket.emit('err', 'No games found');
    })
    .then(([game]) => {
      socket.emit('update game info', game);
      startTimer(game._id);
    })
    .catch(() => {
      socket.emit('err', 'No games found');
    });
  });

  // When a user clicks yes and accepts a game
  socket.on('accepted', () => {
    clearInterval(cd);
    socket.emit('join success');
  });

  // When a user clicks no and rejects a game
  socket.on('rejected', (player, rejectedGames) => {
    clearInterval(cd);
    const latestGame = rejectedGames.pop();
    Game.findById(latestGame)
    .then(game => {
      game.spaces++;
      return game.save();
    })
    .catch(() => {
      socket.emit('err', 'An error occurred');
    });
  });

  function startTimer(gameId) {
    let timer = 10;
    cd = setInterval(() => {
      socket.emit('timer count', timer);
      console.log(timer);
      if (timer === 0) {
        clearInterval(cd);
        socket.emit('timer expired', gameId);
        Game.findById(gameId)
        .then(game => {
          game.spaces++;
          return game.save();
        })
        .catch(() => {
          socket.emit('err', 'An error occurred');
        });
      }
      timer--;
    }, 1000);
  }
});

module.exports = io;
