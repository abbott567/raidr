const mongoose = require('mongoose');

const Game = mongoose.model('Game');
mongoose.Promise = global.Promise;

describe('Set up database', () => {
  before(done => {
    Game.remove({})
    .then(() => {
      const games = [
        new Game({
          host: '{\'platform\':\'2\',\'language\':\'en\',\'gamertag\':\'abbott567\',\'bungieId\':\'4611686018428682003\',\'grimoire\':4485,\'emblem\':\'/common/destiny_content/icons/4ddc836fe272a8c377635fa6cfa1d7a9.jpg\',\'background\':\'/common/destiny_content/icons/580b6d043f3f977531477a690a2771d9.jpg\',\'character\':{\'characterId\':\'\',\'class\':\'\',\'level\':\'\',\'light\':\'\'},\'completedRaids\':[260765522,2659248071,1836893116,2659248068,1836893119],\'characterId\':\'2305843009252290959\',\'class\':2,\'level\':40,\'light\':390}',
          raid: '8',
          spaces: 1
        }),

        new Game({
          host: '{\'platform\':\'2\',\'language\':\'en\',\'gamertag\':\'starfadenb\',\'bungieId\':\'4611686018428682003\',\'grimoire\':4485,\'emblem\':\'/common/destiny_content/icons/4ddc836fe272a8c377635fa6cfa1d7a9.jpg\',\'background\':\'/common/destiny_content/icons/580b6d043f3f977531477a690a2771d9.jpg\',\'character\':{\'characterId\':\'\',\'class\':\'\',\'level\':\'\',\'light\':\'\'},\'completedRaids\':[260765522,2659248071,1836893116,2659248068,1836893119],\'characterId\':\'2305843009252290959\',\'class\':2,\'level\':40,\'light\':390}',
          raid: '8',
          spaces: 1
        })
      ];
      Game.insertMany(games);
    })
    .then(() => {
      done();
    })
    .catch(err => {
      console.log(err);
      done();
    });
  });
  it('should be clear database and save 2 entries', () => {});
});
