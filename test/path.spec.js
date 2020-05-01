// const path = require('path');
const pathFunctions = require('../lib/path');

describe('test to functions with path module', () => {
  it('should return true if path is absolute', () => {
    expect(pathFunctions.IsPathAbsolute()).toBe(true);
  });
  it('esta es una prueba de una promesa', (done) => {
    const promesa = new Promise();
    promesa.then(done);
  });
});
