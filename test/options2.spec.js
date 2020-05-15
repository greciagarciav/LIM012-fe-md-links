const fetchMock = require('../__mocks__/node-fetch.js');
const optionFunctions = require('../lib/api/options');

const arrObj = [
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md', href: 'http://www.iamalinkthatworks.com', text: 'this link works' },
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md', href: 'http://www.iamalinkthatfails.com', text: 'this link fails' },
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md', href: 'iamalinkthatdoesnot', text: 'this link does not exist' },
];
const arrObjValidated = [
  {
    file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md',
    href: 'http://www.iamalinkthatworks.com',
    text: 'this link works',
    status: 200,
    ok: 'OK',
  },
  {
    file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md',
    href: 'http://www.iamalinkthatfails.com',
    text: 'this link fails',
    status: 404,
    ok: 'Not Found',
  },
  {
    file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md',
    href: 'iamalinkthatdoesnot',
    text: 'this link does not exist',
    status: '',
    ok: 'link does not exist',
  },
];
describe('Validate status of link of each object of an array', () => {
  fetchMock
    .mock('http://www.iamalinkthatworks.com', 200)
    .mock('http://www.iamalinkthatfails.com', 404)
    .mock('iamalinkthatdoesnot', () => {
    // eslint-disable-next-line no-throw-literal
      throw 'error';
    });
  it('should return an array of promises of validated links with properties file, href, text, status and ok', (done) => optionFunctions.Validate(arrObj)
    .then((data) => {
      expect(data).toEqual(arrObjValidated);
      done();
    }));
});

const statsLink = 'Total:3 Unique:3';
describe('Get statistis of total and unique links of an ', () => {
  it('should return an array of links from all md files', () => {
    expect(optionFunctions.Stats(arrObjValidated)).toEqual(statsLink);
  });
});

const statsValidatedLinks = 'Total:3 Unique:3 Broken:2';
describe('Get an array of objects', () => {
  it('should return an array of objects where an object represent a link', () => {
    expect(optionFunctions.StatsAndValidate(arrObjValidated)).toEqual(statsValidatedLinks);
  });
});
