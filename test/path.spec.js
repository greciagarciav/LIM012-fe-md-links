const pathFunctions = require('../lib/api/path');

const relativePath = 'dir-test/subdir-test';
const resolvedPath = 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test';
describe('Resolve a path to absolute', () => {
  it('is a function and should resolve a relative path to an absolute path', () => {
    expect(typeof pathFunctions.ResolvedToAbsolute).toBe('function');
  });
  it('should return an absolute path when input is a relative path', () => {
    expect(pathFunctions.ResolvedToAbsolute(relativePath)).toBe(resolvedPath);
  });
  it('should return an absolute path when input is an absolute path', () => {
    expect(pathFunctions.ResolvedToAbsolute(resolvedPath)).toBe(resolvedPath);
  });
});

const dirPath = 'dir-test/subdir-test/';
const filePath = 'dir-test/first.txt/';
describe('Check if a path is a directory', () => {
  it('is a function and should check if if a path is a directory or not', () => {
    expect(typeof pathFunctions.IsPathDIrectory).toBe('function');
  });
  it('should return true if path is a directory', () => {
    expect(pathFunctions.IsPathDIrectory(dirPath)).toBe(true);
  });
  it('should return false if path is not a directory', () => {
    expect(pathFunctions.IsPathDIrectory(filePath)).toBe(false);
  });
});

const arrPathAllFiles = [
  'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\fifth.md',
  'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\fourth.txt',
  'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\sub-sub-dir\\eighth.txt',
  'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\sub-sub-dir\\seventh.md',
  'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\sub-sub-dir\\sixth.md',
];
describe('Return an array of paths of all files', () => {
  it('is a function and should return an array of absolute paths of all files', () => {
    expect(typeof pathFunctions.PathAllFiles).toBe('function');
  });
  it('should return an array of absolute paths of all files in a directory', () => {
    expect(pathFunctions.PathAllFiles(dirPath)).toEqual(arrPathAllFiles);
  });
  it('should return an array with one absolute path file', () => {
    expect(pathFunctions.PathAllFiles(filePath)).toEqual(['C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\first.txt']);
  });
});

const arrPathMdFiles = [
  'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\fifth.md',
  'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\sub-sub-dir\\seventh.md',
  'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\sub-sub-dir\\sixth.md',
];
const arrFileMdPath = ['C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\second.md'];
const arrFilePath = ['C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\first.txt'];
describe('Get an array of md path files', () => {
  it('is a function and should return an array of all md absolute path files', () => {
    expect(typeof pathFunctions.PathMdFiles).toBe('function');
  });
  it('should return an array of all md absolute path files', () => {
    expect(pathFunctions.PathMdFiles(arrPathAllFiles)).toEqual(arrPathMdFiles);
  });
  it('should return an empty array if path is not a md file', () => {
    expect(pathFunctions.PathMdFiles(arrFilePath)).toEqual([]);
  });
  it('should return an array with one absolute path if it is a path of a md file', () => {
    expect(pathFunctions.PathMdFiles(arrFileMdPath)).toEqual(arrFileMdPath);
  });
});

const objLinksPath = { links: ['[Acerca de Node.js - Documentación oficial](https://nodejs.org/es/about/)', '[Node.js file system - Documentación oficial](https://nodejs.org/api/fs.html)', '[Node.js http.get - Documentación oficial](https://nodejs.org/api/http.html#http_http_get_options_callback)'], userPath: 'dir-test/second.md/' };
describe('Get an object with all links of a md file', () => {
  it('is a function and should return an object with all links of a md file', () => {
    expect(typeof pathFunctions.ReadFileGetlinks).toBe('function');
  });
  it('should return an object with all links of a md file', () => {
    expect(pathFunctions.ReadFileGetlinks('dir-test/second.md/')).toEqual(objLinksPath);
  });
  it('should return undefined if md file does not have any link', () => {
    expect(pathFunctions.ReadFileGetlinks('dir-test/third.md/')).toEqual(undefined);
  });
});

const link = '[Acerca de Node.js - Documentación oficial](https://nodejs.org/es/about/)';
const file = 'dir-test/second.md/';
const objLink = { file: 'dir-test/second.md/', href: 'https://nodejs.org/es/about/', text: 'Acerca de Node.js - Documentación oficial' };
describe('Get an object with properties of each link', () => {
  it('is a function and should return an object with properties of each link', () => {
    expect(typeof pathFunctions.ObjLinks).toBe('function');
  });
  it('should return an object with file, href and text properties of each link', () => {
    expect(pathFunctions.ObjLinks(link, file)).toEqual(objLink);
  });
});

const arrObjLinksFiles = [
  { links: ['[learnyounode](https://github.com/workshopper/learnyounode)', '[how-to-npm](https://github.com/workshopper/how-to-npm)', '[promise-it-wont-hurt](https://github.com/stevekane/promise-it-wont-hurt)'], userPath: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\fifth.md' },
  { links: ['[Node.js](https://nodejs.org/en/)', '[módulos (CommonJS)](https://nodejs.org/docs/latest-v0.10.x/api/modules.html)', '[file system](https://nodejs.org/api/fs.html)', '[path](https://nodejs.org/api/path.html)', '[http.get](http://www.quobit.mx/asi-funciona-el-algoritmo-de-luhn-paragenerar-numeros-de-tarjetas-de-credito.html)'], userPath: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\sub-sub-dir\\seventh.md' },
  { links: ['[Node.js](https://nodejs.org/)'], userPath: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\sub-sub-dir\\sixth.md' },
];
describe('Get an array of objects of all links in a md file, each object has all links and the absolute path properties of the file', () => {
  it('is a function and should return an array of objects of all links in a md file', () => {
    expect(typeof pathFunctions.GetArrLinks).toBe('function');
  });
  it('should return an array of objects of all links in a md file', () => {
    expect(pathFunctions.GetArrLinks(arrPathMdFiles)).toEqual(arrObjLinksFiles);
  });
});

const arrObj = [
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\fifth.md', href: 'https://github.com/workshopper/learnyounode', text: 'learnyounode' },
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\fifth.md', href: 'https://github.com/workshopper/how-to-npm', text: 'how-to-npm' },
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\fifth.md', href: 'https://github.com/stevekane/promise-it-wont-hurt', text: 'promise-it-wont-hurt' },
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\sub-sub-dir\\seventh.md', href: 'https://nodejs.org/en/', text: 'Node.js' },
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\sub-sub-dir\\seventh.md', href: 'CommonJS', text: 'módulos (CommonJS)' },
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\sub-sub-dir\\seventh.md', href: 'https://nodejs.org/api/fs.html', text: 'file system' },
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\sub-sub-dir\\seventh.md', href: 'https://nodejs.org/api/path.html', text: 'path' },
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\sub-sub-dir\\seventh.md', href: 'http://www.quobit.mx/asi-funciona-el-algoritmo-de-luhn-paragenerar-numeros-de-tarjetas-de-credito.html', text: 'http.get' },
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test\\subdir-test\\sub-sub-dir\\sixth.md', href: 'https://nodejs.org/', text: 'Node.js' },
];
describe('Get an array of objects where each object is a link with the file, href and text properties', () => {
  it('is a function and should return an array of objects where an object represent a link', () => {
    expect(typeof pathFunctions.GetArrObj).toBe('function');
  });
  it('should return an array of objects where each object is a link', () => {
    expect(pathFunctions.GetArrObj(arrObjLinksFiles, dirPath)).toEqual(arrObj);
  });
});

describe('Get an array of objects ', () => {
  it('is a function and call all the above functions to make it one', () => {
    expect(typeof pathFunctions.ArrObjects).toBe('function');
  });
  it('should return an array of objects and each object represents a link', () => {
    expect(pathFunctions.ArrObjects(dirPath)).toEqual(arrObj);
  });
});
