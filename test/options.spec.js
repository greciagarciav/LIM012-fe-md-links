const fetchMock = require('../__mocks__/node-fetch.js');
const optionFunctions = require('../lib/api/options');

const arrObj = [
  { file: 'dir-test/subdir-test/', href: 'https://github.com/workshopper/learnyounode', text: 'learnyounode' },
  { file: 'dir-test/subdir-test/', href: 'https://github.com/workshopper/how-to-npm', text: 'how-to-npm' },
  { file: 'dir-test/subdir-test/', href: 'https://github.com/stevekane/promise-it-wont-hurt', text: 'promise-it-wont-hurt' },
  { file: 'dir-test/subdir-test/', href: 'https://nodejs.org/en/', text: 'Node.js' },
  { file: 'dir-test/subdir-test/', href: 'CommonJS', text: 'módulos (CommonJS)' },
  { file: 'dir-test/subdir-test/', href: 'https://nodejs.org/api/fs.html', text: 'file system' },
  { file: 'dir-test/subdir-test/', href: 'https://nodejs.org/api/path.html', text: 'path' },
  { file: 'dir-test/subdir-test/', href: 'http://www.quobit.mx/asi-funciona-el-algoritmo-de-luhn-paragenerar-numeros-de-tarjetas-de-credito.html', text: 'http.get' },
  { file: 'dir-test/subdir-test/', href: 'https://nodejs.org/', text: 'Node.js' },
];

const arrObjValidated = [
  {
    file: 'dir-test/subdir-test/',
    href: 'https://github.com/workshopper/learnyounode',
    text: 'learnyounode',
    status: 200,
    ok: 'OK',
  },
  {
    file: 'dir-test/subdir-test/',
    href: 'https://github.com/workshopper/how-to-npm',
    text: 'how-to-npm',
    status: 200,
    ok: 'OK',
  },
  {
    file: 'dir-test/subdir-test/',
    href: 'https://github.com/stevekane/promise-it-wont-hurt',
    text: 'promise-it-wont-hurt',
    status: 200,
    ok: 'OK',
  },
  {
    file: 'dir-test/subdir-test/',
    href: 'https://nodejs.org/en/',
    text: 'Node.js',
    status: 200,
    ok: 'OK',
  },
  {
    file: 'dir-test/subdir-test/',
    href: 'CommonJS',
    text: 'módulos (CommonJS)',
    status: '',
    ok: 'link does not exist',
  },
  {
    file: 'dir-test/subdir-test/',
    href: 'https://nodejs.org/api/fs.html',
    text: 'file system',
    status: 200,
    ok: 'OK',
  },
  {
    file: 'dir-test/subdir-test/',
    href: 'https://nodejs.org/api/path.html',
    text: 'path',
    status: 200,
    ok: 'OK',
  },
  {
    file: 'dir-test/subdir-test/',
    href: 'http://www.quobit.mx/asi-funciona-el-algoritmo-de-luhn-paragenerar-numeros-de-tarjetas-de-credito.html',
    text: 'http.get',
    status: 404,
    ok: 'Not Found',
  },
  {
    file: 'dir-test/subdir-test/',
    href: 'https://nodejs.org/',
    text: 'Node.js',
    status: 200,
    ok: 'OK',
  },
];

describe('Validate status of link of each object of an array', () => {
  fetchMock
    .mock('https://github.com/workshopper/learnyounode', 200)
    .mock('https://github.com/workshopper/how-to-npm', 200)
    .mock('https://github.com/stevekane/promise-it-wont-hurt', 200)
    .mock('https://nodejs.org/en/', 200)
    .mock('https://nodejs.org/api/fs.html', 200)
    .mock('https://nodejs.org/api/path.html', 200)
    .mock('https://nodejs.org/', 200)
    .mock('http://www.quobit.mx/asi-funciona-el-algoritmo-de-luhn-paragenerar-numeros-de-tarjetas-de-credito.html', 404)
    .mock('CommonJS', () => {
    // eslint-disable-next-line no-throw-literal
      throw 'error';
    });
  it('should return an array of promises of validated links with properties file, href, text, status and ok', (done) => optionFunctions.Validate(arrObj)
    .then((data) => {
      expect(data).toEqual(arrObjValidated);
      done();
    }));
});

const statsLink = 'Total:9 Unique:9';
describe('Get statistis of total and unique links of an ', () => {
  it('should return an array of links from all md files', () => {
    expect(optionFunctions.Stats(arrObjValidated)).toEqual(statsLink);
  });
});

const statsValidatedLinks = 'Total:9 Unique:9 Broken:2';
describe('Get an array of objects', () => {
  it('should return an array of objects where an object represent a link', () => {
    expect(optionFunctions.StatsAndValidate(arrObjValidated)).toEqual(statsValidatedLinks);
  });
});
