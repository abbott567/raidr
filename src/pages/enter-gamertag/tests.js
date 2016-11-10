/* eslint-disable no-undef */
'use-strict';

require('mocha');
const chai = require('chai');

const expect = chai.expect;

const f = require('./functions');

describe('getBungieId(platform, gamertag)', () => {
  it('should return a bungieId if a correct platform and userId are supplied', () => {
    return f.getBungieId('2', 'abbott567')
    .then(response => {
      expect(response).to.not.eql(false);
    });
  });

  it('should return FALSE if gamertag is invalid', () => {
    return f.getBungieId('2', 'ghagjddghgsjdg667tyudghasjgd')
    .catch(err => {
      expect(err).to.eql(false);
    });
  });

  it('should return FALSE if platform is invalid', () => {
    return f.getBungieId('3', 'abbott567')
    .catch(err => {
      expect(err).to.eql(false);
    });
  });

  it('should return FALSE if a gamertag is blank', () => {
    return f.getBungieId('2', '')
    .catch(err => {
      expect(err).to.eql(false);
    });
  });

  it('should return FALSE if a platform is blank', () => {
    return f.getBungieId('', 'abbott567')
    .catch(err => {
      expect(err).to.eql(false);
    });
  });
});

describe('getCharacter(platform, bungieId)', function () {
  this.timeout(5000);
  it('should return character if correct platform and bungieId are supplied', () => {
    return f.getCharacter('2', '4611686018428682003')
    .then(response => {
      expect(response).to.not.eql(false);
    });
  });

  it('should return FALSE if bungieId is blank', () => {
    return f.getCharacter('2', '')
    .catch(err => {
      expect(err).to.eql(false);
    });
  });

  it('should return FALSE if platform is blank', () => {
    return f.getCharacter('', '4611686018428682003')
    .catch(err => {
      expect(err).to.eql(false);
    });
  });

  it('should return FALSE if bungieId is invalid', () => {
    return f.getCharacter('2', '456')
    .catch(err => {
      expect(err).to.eql(false);
    });
  });

  it('should return FALSE if platform is invalid', () => {
    return f.getCharacter('3', '4611686018428682003')
    .catch(err => {
      expect(err).to.eql(false);
    });
  });
});

describe('getRaids(platform, bungieId, characterId)', () => {
  it('Should return an array', () => {
    return f.getRaids('2', '4611686018428682003', '2305843009252291000')
    .then(response => {
      expect(response).to.be.an('array');
    });
  });

  it('Should return FALSE if platform is blank', () => {
    return f.getRaids('', '4611686018428682003', '2305843009252291000')
    .catch(err => {
      expect(err).to.eql(false);
    });
  });

  it('Should return FALSE if bungieId is blank', () => {
    return f.getRaids('2', '', '2305843009252291000')
    .catch(err => {
      expect(err).to.eql(false);
    });
  });

  it('Should return FALSE if characterId is blank', () => {
    return f.getRaids('2', '4611686018428682003', '')
    .catch(err => {
      expect(err).to.eql(false);
    });
  });

  it('Should return FALSE if platform is invalid', () => {
    return f.getRaids('3', '4611686018428682003', '2305843009252291000')
    .catch(err => {
      expect(err).to.eql(false);
    });
  });

  it('Should return FALSE if bungieId is invalid', () => {
    return f.getRaids('2', '567', '2305843009252291000')
    .catch(err => {
      expect(err).to.eql(false);
    });
  });

  it('Should return FALSE if characterId is invalid', () => {
    return f.getRaids('2', '4611686018428682003', '567')
    .catch(err => {
      expect(err).to.eql(false);
    });
  });
});

describe('validate(req)', () => {
  it('should return an empty array if all fields are present', () => {
    const req = {
      body: {
        platform: '2',
        gamertag: 'abbott567',
        language: 'en'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(0);
  });

  it('should return 1 error in an array if gamertag is blank', () => {
    const req = {
      body: {
        platform: '2',
        gamertag: '',
        language: 'en'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });

  it('should return 1 error in an array if platform is blank', () => {
    const req = {
      body: {
        platform: '',
        gamertag: 'abbott567',
        language: 'en'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });

  it('should return 1 error in an array if language is blank', () => {
    const req = {
      body: {
        platform: '2',
        gamertag: 'abbott567',
        language: ''
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });

  it('should return 1 error in an array if language is invalid', () => {
    const req = {
      body: {
        platform: '2',
        gamertag: 'abbott567',
        language: 'potato'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });

  it('should return 2 errors in an array if platform and gamertag are blank', () => {
    const req = {
      body: {
        platform: '',
        gamertag: '',
        language: 'en'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(2);
  });

  it('should return 2 errors in an array if platform and language are blank', () => {
    const req = {
      body: {
        platform: '',
        gamertag: 'abbott567',
        language: ''
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(2);
  });

  it('should return 2 errors in an array if gamertag and language are blank', () => {
    const req = {
      body: {
        platform: '2',
        gamertag: '',
        language: ''
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(2);
  });

  it('should return 3 errors in an array if all fields are blank', () => {
    const req = {
      body: {
        platform: '',
        gamertag: '',
        language: ''
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(3);
  });
});

describe('buildPlayerObject(req)', () => {
  it('should return a player object if successful', () => {
    const req = {
      body: {
        platform: '2',
        gamertag: 'abbott567',
        language: 'en'
      }
    };
    return f.buildPlayerObject(req)
    .then(player => {
      expect(player).to.eql(
        {
          platform: '2',
          gamertag: 'abbott567',
          bungieId: '4611686018428682003',
          grimoire: 4485,
          language: 'en',
          emblem: '/common/destiny_content/icons/4ddc836fe272a8c377635fa6cfa1d7a9.jpg',
          background: '/common/destiny_content/icons/580b6d043f3f977531477a690a2771d9.jpg',
          character: {
            characterId: '2305843009252291000',
            class: 2,
            level: 40,
            light: 390
          },
          completedRaids: [260765522]
        }
      );
    });
  });

  it('should return false if platform blank', () => {
    const req = {
      body: {
        platform: '',
        gamertag: 'abbott567'
      }
    };
    return f.buildPlayerObject(req)
    .catch(err => {
      expect(err).to.eql(false);
    });
  });

  it('should return false if gamertag blank', () => {
    const req = {
      body: {
        platform: '2',
        gamertag: ''
      }
    };
    return f.buildPlayerObject(req)
    .catch(err => {
      expect(err).to.eql(false);
    });
  });

  it('should return false if gamertag and platform blank', () => {
    const req = {
      body: {
        platform: '',
        gamertag: ''
      }
    };
    return f.buildPlayerObject(req)
    .catch(err => {
      expect(err).to.eql(false);
    });
  });
});
/* eslint-enable no-undef */
