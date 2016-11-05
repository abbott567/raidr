const got = require('got');
const host = require('../../../config/host');

const gotOptions = {
  headers: {
    'X-API-Key': process.env.DESTINY_API_KEY
  },
  retries: 5
};

const _this = module.exports = {
  getBungieId(platform, gamertag) {
    return new Promise((resolve, reject) => {
      got(`${host}/SearchDestinyPlayer/${platform}/${gamertag}`, gotOptions)
      .then(data => {
        data = JSON.parse(data.body).Response[0].membershipId;
        resolve(data);
      })
      .catch(() => {
        reject(false);
      });
    });
  },

  getCharacter(platform, bungieId) {
    return new Promise((resolve, reject) => {
      got(`${host}/${platform}/Account/${bungieId}/Summary/`, gotOptions)
      .then(data => {
        data = JSON.parse(data.body).Response.data.characters[0];
        const character = {
          characterId: data.characterBase.characterId,
          class: data.characterBase.classType,
          level: data.characterLevel,
          light: data.characterBase.powerLevel,
          emblem: data.emblemPath,
          background: data.backgroundPath,
          grimoire: data.characterBase.grimoireScore
        };
        resolve(character);
      })
      .catch(() => {
        reject(false);
      });
    });
  },

  getRaids(platform, bungieId, characterId) {
    return new Promise((resolve, reject) => {
      got(`${host}/Stats/ActivityHistory/${platform}/${bungieId}/${characterId}/?mode=Raid`, gotOptions)
      .then(data => {
        data = JSON.parse(data.body).Response.data.activities;
        const completedRaids = new Set([]);
        for (let i = 0; i < data.length; i++) {
          const completed = data[i].values.completed.basic.value;
          if (completed) {
            completedRaids.add(data[i].activityDetails.referenceId);
          }
        }

        resolve(Array.from(completedRaids));
      })
      .catch(() => {
        reject(false);
      });
    });
  },

  validate(req) {
    const gamertag = req.body.gamertag;
    const platform = req.body.platform;
    const language = req.body.language;
    const errors = [];

    if (!gamertag) {
      errors.push('Gamertag cannot be blank');
    }

    if (!platform) {
      errors.push('Choose a platform');
    }

    if (!language) {
      errors.push('Choose a language');
    } else if (language !== 'en') {
      errors.push('Unsupported language selected');
    }

    return errors;
  },

  buildPlayerObject: req => {
    return new Promise((resolve, reject) => {
      const gamertag = req.body.gamertag;
      const platform = req.body.platform;
      _this.getBungieId(platform, gamertag)
      .then(bungieId => {
        const user = {
          platform,
          gamertag,
          bungieId
        };
        return user;
      })
      .then(user => {
        return Promise.all([user, _this.getCharacter(user.platform, user.bungieId)]);
      })
      .then(([user, character]) => {
        return Promise.all([user, character, _this.getRaids(user.platform, user.bungieId, character.characterId)]);
      })
      .then(([user, character, raids]) => {
        const player = {
          platform: user.platform,
          gamertag: user.gamertag,
          bungieId: user.bungieId,
          grimoire: character.grimoire,
          emblem: character.emblem,
          background: character.background,
          character: {
            characterId: character.characterId,
            class: character.class,
            level: character.level,
            light: character.light
          },
          completedRaids: raids
        };
        resolve(player);
      })
      .catch(err => {
        reject(err);
      });
    });
  }
};
