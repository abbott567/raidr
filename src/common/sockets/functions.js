const io = require('socket.io')();
const mongoose = require('mongoose');

const Game = mongoose.model('Game');

io.on('connection', socket => {
  let cd;
  console.log('a user connected');

  socket.on('playerInfo', playerInfo => {
    const language = playerInfo.player.language;
    const raid = playerInfo.gameId;
    const rejectedGames = playerInfo.rejectedGames;

    return Game.findOne(
      {language, raid, spaces: {$gt: 0}, _id: {$nin: rejectedGames}},
      'host spaces',
      {sort: {createdAt: 1}}
    )
    .then(game => {
      if (game) {
        game.spaces--;
        return Promise.all([game, game.save()]);
      }
    })
    .then(([game]) => {
      socket.emit('update game info', game);
      startTimer(game._id);
    })
    .catch(() => {
      socket.emit('err', 'No games found');
    });
  });

  socket.on('rejected', playerInfo => {
    clearInterval(cd);
    const latestGame = playerInfo.rejectedGames.slice(-1, 1)[0];
    console.log('game rejected');
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
