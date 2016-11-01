/* eslint-disable no-undef */
'use-strict';

require('mocha');
const chai = require('chai');

const expect = chai.expect;

const f = require('./functions');

describe('getBungieId()', () => {
  it('should return a bungie id if it can be found', () => {
    const req = {body: {platform: '2', gamertag: 'abbott567'}};
    return f.getBungieId(req.body.platform, req.body.gamertag)
    .then(response => {
      response = JSON.parse(response.body);
      const bungieId = response.Response[0].membershipId;
      expect(bungieId).to.not.eql(undefined);
    });
  });

  it('should return throw an error if platform not 1 or 2', () => {
    const req = {body: {platform: '3', gamertag: 'abbott567'}};
    return f.getBungieId(req.body.platform, req.body.gamertag)
    .then(response => {
      response = JSON.parse(response.body);
      expect(response.ErrorCode).to.eql(7);
    });
  });

  it('should return throw an error if gamertag not found', () => {
    const req = {body: {platform: '2', gamertag: 'yghfys764863gjdgsjsgj473'}};
    return f.getBungieId(req.body.platform, req.body.gamertag)
    .then(response => {
      response = JSON.parse(response.body);
      expect(response.ErrorCode).to.eql(1);
    });
  });
});
/* eslint-enable no-undef */
