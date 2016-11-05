/* eslint-disable no-undef */
'use-strict';

require('mocha');
const chai = require('chai');

const expect = chai.expect;

const f = require('./functions');

describe('validate(req)', () => {
  it('should be valid if raid is valid', () => {
    const req = {
      body: {
        raid: '1'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(0);
  });

  it('should return 1 error if raid chosen is invalid', () => {
    const req = {
      body: {
        raid: 'potato'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });

  it('should return 1 error if raid chosen > 8', () => {
    const req = {
      body: {
        raid: '9'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });
});
/* eslint-enable no-undef */
