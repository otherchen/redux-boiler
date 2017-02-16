import { assert } from 'chai'

/*
  Backend Testing Stack
  1. Mocha
  2. Chai
  3. Sinon
*/

describe('jsDOM Config', function() {
  it('should prepare global properties for testing', function () {
    assert.equal(global.navigator.userAgent, 'node.js');
    assert.equal(global.window, document.defaultView);
  });
});
