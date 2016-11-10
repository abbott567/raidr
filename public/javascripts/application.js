$(function () {
  var apikey = '21f679f2524e4b8aa7567e6e80860192';
  var playerCookie = Cookies.get('player');
  var socket;
  var rejectedGames = [];
  var raidId;
  var currentGame;

  if (playerCookie) {
    player = playerCookie;
    connectSockets(player);
  } else {
    var player = {
      platform: '',
      language: '',
      gamertag: '',
      bungieId: '',
      grimoire: '',
      emblem: '',
      background: '',
      character: {
        characterId: '',
        class: '',
        level: '',
        light: ''
      },
      completedRaids: []
    };
  }

  function getBungieId(apikey, platform, gamertag) {
    var bungieURL = 'https://www.bungie.net/platform/destiny/SearchDestinyPlayer/' + platform + '/' + gamertag + '/';

    $.ajax({
      url: bungieURL,
      method: 'get',
      type: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-API-Key', apikey);
      },
      success: function (data) {
        player.bungieId = data.Response[0].membershipId;
        getCharacter(apikey, platform, player.bungieId);
      },
      error: function (err) {
        console.log(err);
      }
    });
  }

  function getCharacter(apikey, platform, bungieId) {
    var bungieURL = 'https://www.bungie.net/platform/destiny/' + platform + '/Account/' + bungieId + '/Summary/';

    $.ajax({
      url: bungieURL,
      method: 'get',
      type: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-API-Key', apikey);
      },
      success: function (data) {
        data = data.Response.data.characters[0];

        player.characterId = data.characterBase.characterId;
        player.class = data.characterBase.classType;
        player.level = data.characterLevel;
        player.light = data.characterBase.powerLevel;
        player.emblem = data.emblemPath;
        player.background = data.backgroundPath;
        player.grimoire = data.characterBase.grimoireScore;

        getRaids(apikey, platform, bungieId, player.characterId);
      },
      error: function (err) {
        console.log(err);
      }
    });
  }

  function getRaids(apikey, platform, bungieId, characterId) {
    var bungieURL = 'https://www.bungie.net/platform/destiny/Stats/ActivityHistory/' + platform + '/' + bungieId + '/' + characterId + '/?mode=Raid';

    $.ajax({
      url: bungieURL,
      method: 'get',
      type: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('X-API-Key', apikey);
      },
      success: function (data) {
        data = data.Response.data.activities;

        for (var i = 0; i < data.length; i++) {
          var completed = data[i].values.completed.basic.value;

          if (completed) {
            var referenceId = data[i].activityDetails.referenceId;
            if (player.completedRaids.indexOf(referenceId) < 0) {
              player.completedRaids.push(referenceId);
            }
          }
        }

        storePlayer(player);
      },
      error: function (err) {
        console.log(err);
      }
    });
  }

  /* eslint-disable no-undef */
  function storePlayer(player) {
    Cookies.set('player', player);
    loadStartPage();
  }
  /* eslint-enable no-undef */

  function loadStartPage() {
    $('#content').load('/forms/find-players-or-game.html');
    connectSockets(player);
  }

  function loadCreateAGame() {
    $('#content').load('/forms/create-a-game.html');
  }

  function loadAwaitPlayers() {
    $('#content').load('/forms/await-players.html');
  }

  function loadFindAGame() {
    $('#content').load('/forms/find-a-game.html');
  }

  function connectSockets(player) {
    socket = io();

    socket.emit('player info', player);

    socket.on('game saved', function (response) {
      if (response) {
        loadAwaitPlayers();
      } else {
        console.log(response);
      }
    });

    // When the timer hits 0
    socket.on('timer expired', function (gameId) {
      console.log('timer expired');
      rejectedGames.push(gameId);
      socket.emit('find a game', player, raidId, rejectedGames);
    });

    // Update the timer every second
    socket.on('timer count', function (time) {
      $('#timer').html(time);
    });

    // New game received, update DOM
    socket.on('update game info', function (game) {
      currentGame = game;
      game.host = JSON.parse(game.host);
      $('#content').load('/forms/game-found.html', function () {
        $('#spaces').text(game.spaces + 1);
        $('#host').text(game.host.gamertag);
        $('#grimoire').text(game.host.grimoire);
        $('#emblem').attr('src', 'https://www.bungie.net/' + game.host.emblem);
        $('#background').attr('src', 'https://www.bungie.net/' + game.host.background);
        $('#class').text(game.host.class);
        $('#level').text(game.host.level);
        $('#light').text(game.host.light);
      });
    });

    // Game wasn't received, display error
    socket.on('err', function (err) {
      if (err === 'No games found' && rejectedGames.length > 0) {
        $('#content').html('<h2>' + err + '</h2><button id="start-over">Start over</button>')
      }

      if (err === 'No games found' && rejectedGames.length === 0) {
        $('#content').html('<h2>' + err + '</h2>');
        // NEED TO CREATE A LOOP TO CHECK EVERY 10 SECS
      }
    });

    socket.on('join success', function () {
      console.log(player, currentGame);
      // CHANGE PAGE TO INSTRUCTIONS
      // SEND MESSAGE TO HOST ABOUT SOME DUDE WANTING TO JOIN
    });
  }

  // When you accept a game
  $(document).on('click', '#join-game-yes', function (e) {
    e.preventDefault();
    socket.emit('accepted');
  });

  // When you reject a game
  $(document).on('click', '#join-game-no', function (e) {
    e.preventDefault();
    rejectedGames.push(currentGame._id);
    socket.emit('rejected', player, rejectedGames);
    socket.emit('find a game', player, raidId, rejectedGames);
  });

  $(document).on('submit', '#player-info', function (e) {
    e.preventDefault();
    player.gamertag = $('#gamertag').val();
    player.platform = $('input[name="platform"]:checked').val();
    player.language = $('select[name="language"]').val();

    getBungieId(apikey, player.platform, player.gamertag);
  });

  $(document).on('submit', '#find-type', function (e) {
    e.preventDefault();
    if ($('input[name="find-type-select"]:checked').val() === 'create') {
      loadCreateAGame();
    } else if ($('input[name="find-type-select"]:checked').val() === 'find') {
      loadFindAGame();
    }
  });

  $(document).on('submit', '#create-a-game', function (e) {
    e.preventDefault();

    var raid = $('select[name="raid"]').val();
    var spaces = $('input[name="players"]:checked').val();

    socket.emit('create game', player, raid, spaces);
  });

  $(document).on('submit', '#which-raid', function (e) {
    e.preventDefault();
    raidId = $('select[name="raid"]').val();
    socket.emit('find a game', player, raidId, rejectedGames);
  });

  $(document).on('click', '#start-over', function () {
    rejectedGames = [];
    socket.emit('find a game', player, raidId, rejectedGames);
  });
});
