const got = require('got');

const base = {headers: {'X-API-Key': process.env.DESTINY_API_KEY}};

module.exports = {
  getBungieId(platform, gamertag) {
    return new Promise((resolve, reject) => {
      got(`http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/${platform}/${gamertag}`, base)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
    });
  }
};
