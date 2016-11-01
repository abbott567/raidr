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
  }
};
