/* eslint-disable no-undef */
'use-strict';

require('mocha');
const chai = require('chai');

const expect = chai.expect;

const f = require('./functions');

describe('validate(req)', () => {
  it('should return an empty array if a selection has been made', () => {
    const req = {
      body: {
        'game-type': 'solo'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(0);
  });

  it('should return an array with 1 error if a selection has not been made', () => {
    const req = {
      body: {}
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });
});
/* eslint-enable no-undef */
