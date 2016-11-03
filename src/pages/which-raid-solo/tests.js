/* eslint-disable no-undef */
'use-strict';

require('mocha');
const chai = require('chai');

const expect = chai.expect;

const f = require('./functions');
// which raid which language
describe('validate(req)', () => {
  it('should return an empty array if a raid and language present', () => {
    const req = {
      body: {
        raid: 'wrath of the machine',
        language: 'en'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(0);
  });

  it('should return an array with 1 error if raid is blank', () => {
    const req = {
      body: {
        raid: '',
        language: 'en'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });

  it('should return an array with 1 error if langauge is blank', () => {
    const req = {
      body: {
        raid: 'wrath of the machine',
        language: ''
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });

  it('should return an array with 2 errors if raid and langauge are blank', () => {
    const req = {
      body: {
        raid: '',
        language: ''
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(2);
  });
});
/* eslint-enable no-undef */
