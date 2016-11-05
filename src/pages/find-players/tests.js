/* eslint-disable no-undef */
'use-strict';

require('mocha');
const chai = require('chai');

const expect = chai.expect;

const f = require('./functions');

describe('validate(req)', () => {
  it('should be valid if raid and players are correct', () => {
    const req = {
      body: {
        raid: '1',
        players: '2'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(0);
  });

  it('should return 1 error if raid chosen is greater than 8', () => {
    const req = {
      body: {
        raid: '9',
        players: '2'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });

  it('should return 1 error if raid chosen is invalid', () => {
    const req = {
      body: {
        raid: 'potato',
        players: '2'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });

  it('should return 1 error if #players has no selection', () => {
    const req = {
      body: {
        raid: '1',
        players: ''
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });

  it('should return 1 error if #players is above 5', () => {
    const req = {
      body: {
        raid: '1',
        players: '6'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });

  it('should return 2 errors if #players is > 5 and raid is invalid', () => {
    const req = {
      body: {
        raid: 'potato',
        players: '6'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(2);
  });

  it('should return 2 errors if #players has no selection and raid is invalid', () => {
    const req = {
      body: {
        raid: 'potato',
        players: ''
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(2);
  });
});
/* eslint-enable no-undef */
