const got = require('got');

const base = {headers: {'X-API-Key': process.env.DESTINY_API_KEY}};

module.exports = {
  getBungieId(platform, gamertag) {
    return new Promise((resolve, reject) => {
      got(`http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/${platform}/${gamertag}`, base)
      .then(data => {
        data = JSON.parse(data.body).Response[0].membershipId;
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
    });
  },

  getCharacter(platform, bungieId) {
    return new Promise((resolve, reject) => {
      got(`http://www.bungie.net/Platform/Destiny/${platform}/Account/${bungieId}/Summary/`, base)
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
      .catch(err => {
        reject(err);
      });
    });
  }
};
