const io = require('socket.io')();
const mongoose = require('mongoose');

const Game = mongoose.model('Game');
let cd;

io.set('origins', '*:*');
io.on('connection', socket => {
  console.log('a user connected');
  const _this = {};

  socket.on('player', player => {
    player = JSON.parse(player);
    _this.player = player;
    findGame(_this.player, [])
    .then(game => {
      game.spaces--;
      return game;
    })
    .then(game => {
      return game.save();
    })
    .then(game => {
      startTimer(game._id);
      socket.emit('game found', game);
    })
    .catch(err => {
      console.log(err);
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('accept game', () => {
    console.log('game accepted');
    clearInterval(cd);
  });

  socket.on('reject game', (rejectedGames, latestGame) => {
    Game.findById(latestGame)
    .then(game => {
      game.spaces++;
      clearInterval(cd);
      return game;
    })
    .then(game => {
      return game.save();
    })
    .then(() => {
      return findGame(_this.player, rejectedGames);
    })
    .then(newGame => {
      startTimer(newGame._id);
      socket.emit('game found', newGame);
    })
    .catch(err => {
      console.log(err);
    });
  });

  function findGame(player, rejectedGames) {
    const language = player.language;
    const raid = player.raidId;

    return Game.findOne(
      {language, raid, spaces: {$gt: 0}, _id: {$nin: rejectedGames}},
      'host spaces',
      {sort: {createdAt: 1}}
    )
    .then(game => {
      return game;
    })
    .catch(() => {
      return false;
    });
  }
});

function startTimer(gameId) {
  let timer = 10;
  cd = setInterval(() => {
    console.log(timer);
    timer--;
    if (timer === 0) {
      clearInterval(cd);
      Game.findById(gameId)
      .then(game => {
        clearInterval(cd);
        game.spaces++;
        return game;
      })
      .then(game => {
        return game.save();
      });
    }
  }, 1000);
}

module.exports = io;
