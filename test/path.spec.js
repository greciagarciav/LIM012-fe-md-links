// const path = require('path');
const pathFunctions = require('../lib/path');

describe('test to functions with path module', () => {
  it('should return false if path is not absolute', () => {
    expect(pathFunctions.IsPathAbsolute('./lib/options.js')).toBe(false);
  });
});
