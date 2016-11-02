const got = require('got');
const host = require('../../config');

const base = {headers: {'X-API-Key': process.env.DESTINY_API_KEY}};

module.exports = {
  getBungieId(platform, gamertag) {
    return new Promise((resolve, reject) => {
      got(`${host}/SearchDestinyPlayer/${platform}/${gamertag}`, base)
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
      got(`${host}/${platform}/Account/${bungieId}/Summary/`, base)
      .then(data => {
        data = JSON.parse(data.body).Response.data.characters[0];
        const character = {
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
      got(`${host}/Stats/ActivityHistory/${platform}/${bungieId}/${characterId}/?mode=Raid`, base)
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
  }
};
