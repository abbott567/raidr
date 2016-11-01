/* eslint-disable no-undef */
'use-strict';

require('mocha');
const chai = require('chai');

const expect = chai.expect;

const f = require('./functions');

// describe('getBungieId()', () => {
//   it('', () => {
//     return f.getBungieId('2', 'abbott567')
//     .then(response => {
//     });
//   });
// });

describe('getCharacter()', () => {
  it('', () => {
    return f.getCharacter('2', '4611686018428682003')
    .then(response => {
    });
  });
});
/* eslint-enable no-undef */
