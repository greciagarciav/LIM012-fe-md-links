const optionFunctions = require('../lib/api/options');

describe('Read the directory', () => {
  it('should return an array of absolute paths of md files ', () => {
    expect(typeof optionFunctions.Validate).toBe('function');
  });
});

describe('Get an array of links', () => {
  it('should return an array of links from all md files', () => {
    expect(typeof optionFunctions.Stats).toBe('function');
  });
});

describe('Get an array of objects', () => {
  it('should return an array of objects where an object represent a link', () => {
    expect(typeof optionFunctions.StatsAndValidate).toBe('function');
  });
});
