/* eslint-disable no-undef */
'use-strict';

require('mocha');
const mongoose = require('mongoose');
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

describe('createGame(req)', () => {
  afterEach(() => {
    delete mongoose.connection.models.Game;
  });

  it('should return a game if all attributes are present', () => {
    const req = {
      cookies: {
        player: {
          gamertag: 'abbott567',
          language: 'en'
        }
      },
      body: {
        raid: '8',
        players: 1
      }
    };
    const game = f.createGame(req);
    expect(game).to.not.eql(false);
  });

  it('should return false if gamertag is blank', () => {
    const req = {
      cookies: {
        player: {
          gamertag: '',
          language: 'en'
        }
      },
      body: {
        raid: '8',
        players: 1
      }
    };
    const game = f.createGame(req);
    expect(game).to.eql(false);
  });

  it('should return false if language is blank', () => {
    const req = {
      cookies: {
        player: {
          gamertag: 'abbott567',
          language: ''
        }
      },
      body: {
        raid: '8',
        players: 1
      }
    };
    const game = f.createGame(req);
    expect(game).to.eql(false);
  });

  it('should return false if raid is blank', () => {
    const req = {
      cookies: {
        player: {
          gamertag: 'abbott567',
          language: 'en'
        }
      },
      body: {
        raid: '',
        players: 1
      }
    };
    const game = f.createGame(req);
    expect(game).to.eql(false);
  });

  it('should return false if players is blank', () => {
    const req = {
      cookies: {
        player: {
          gamertag: 'abbott567',
          language: 'en'
        }
      },
      body: {
        raid: '8',
        players: ''
      }
    };
    const game = f.createGame(req);
    expect(game).to.eql(false);
  });
});
/* eslint-enable no-undef */
