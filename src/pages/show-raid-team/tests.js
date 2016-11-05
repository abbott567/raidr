/* eslint-disable no-undef */
'use-strict';

require('mocha');
const chai = require('chai');

const expect = chai.expect;

const f = require('./functions');

describe('validate(req)', () => {
  it('should be valid if yes is selected', () => {
    const req = {
      body: {
        join: '1'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(0);
  });

  it('should be valid if no is selected', () => {
    const req = {
      body: {
        join: '0'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(0);
  });

  it('should be invalid if nothing is selected', () => {
    const req = {
      body: {
        join: ''
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });

  it('should be invalid if selection > 1', () => {
    const req = {
      body: {
        join: '3'
      }
    };
    const errors = f.validate(req);
    expect(errors.length).to.eql(1);
  });
});
/* eslint-enable no-undef */
