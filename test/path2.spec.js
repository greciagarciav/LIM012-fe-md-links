const pathFunctions = require('../lib/api/path');

const relativePath = 'dir-test2/subdir-test';
const resolvedPath = 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test';
describe('1.Resolve a path to absolute', () => {
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

const dirPath = './dir-test2';
const filePath = './dir-test2/subdir-test/first.md/';
describe('2.Check if a path is a directory', () => {
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
  'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\fourth.txt',
  'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md',
  'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\second.md',
  'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\third.txt',
];
describe('3.Return an array of paths of all files', () => {
  it('is a function and should return an array of absolute paths of all files', () => {
    expect(typeof pathFunctions.PathAllFiles).toBe('function');
  });
  it('should return an array of absolute paths of all files in a directory', () => {
    expect(pathFunctions.PathAllFiles(dirPath)).toEqual(arrPathAllFiles);
  });
  it('should return an array with one absolute path file', () => {
    expect(pathFunctions.PathAllFiles(filePath)).toEqual(['C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md']);
  });
});

const arrPathMdFiles = [
  'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md',
  'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\second.md',
];
const arrFileMdPath = ['C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md'];
const arrFilePath = ['C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\third.txt'];
describe('4.Get an array of md path files', () => {
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

const objLinksPath = { links: ['[this link works](http://www.iamalinkthatworks.com)', '[this link fails](http://www.iamalinkthatfails.com)', '[this link does not exist](iamalinkthatdoesnot)'], userPath: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md' };
describe('5.Get an object with all links of a md file', () => {
  it('is a function and should return an object with all links of a md file', () => {
    expect(typeof pathFunctions.ReadFileGetlinks).toBe('function');
  });
  it('should return an object with all links of a md file', () => {
    expect(pathFunctions.ReadFileGetlinks('C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md')).toEqual(objLinksPath);
  });
  it('should return undefined if md file does not have any link', () => {
    expect(pathFunctions.ReadFileGetlinks('C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\second.md')).toEqual(undefined);
  });
});

const link = '[this link works](http://www.iamalinkthatworks.com)';
const file = 'dir-test2/subdir-test/first.md/';
const objLink = { file: 'dir-test2/subdir-test/first.md/', href: 'http://www.iamalinkthatworks.com', text: 'this link works' };
describe('6.Get an object with properties of each link', () => {
  it('is a function and should return an object with properties of each link', () => {
    expect(typeof pathFunctions.ObjLinks).toBe('function');
  });
  it('should return an object with file, href and text properties of each link', () => {
    expect(pathFunctions.ObjLinks(link, file)).toEqual(objLink);
  });
});

const arrObjLinksFiles = [{ links: ['[this link works](http://www.iamalinkthatworks.com)', '[this link fails](http://www.iamalinkthatfails.com)', '[this link does not exist](iamalinkthatdoesnot)'], userPath: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md' }];
describe('7.Get an array of objects of all links in a md file, each object has all links and the absolute path properties of the file', () => {
  it('is a function and should return an array of objects of all links in a md file', () => {
    expect(typeof pathFunctions.GetArrLinks).toBe('function');
  });
  it('should return an array of objects of all links in a md file', () => {
    expect(pathFunctions.GetArrLinks(arrPathMdFiles)).toEqual(arrObjLinksFiles);
  });
});

const arrObj = [
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md', href: 'http://www.iamalinkthatworks.com', text: 'this link works' },
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md', href: 'http://www.iamalinkthatfails.com', text: 'this link fails' },
  { file: 'C:\\Users\\Estudiante\\Documents\\Laboratoria LIM 012 - Grecia\\Track\\LIM012-fe-md-links\\dir-test2\\subdir-test\\first.md', href: 'iamalinkthatdoesnot', text: 'this link does not exist' },
];
describe('8.Get an array of objects where each object is a link with the file, href and text properties', () => {
  it('is a function and should return an array of objects where an object represent a link', () => {
    expect(typeof pathFunctions.GetArrObj).toBe('function');
  });
  it('should return an array of objects where each object is a link', () => {
    expect(pathFunctions.GetArrObj(arrObjLinksFiles)).toEqual(arrObj);
  });
});

describe('9.Get an array of objects ', () => {
  it('is a function and call all the above functions to make it one', () => {
    expect(typeof pathFunctions.ArrObjects).toBe('function');
  });
  it('should return an array of objects and each object represents a link', () => {
    expect(pathFunctions.ArrObjects(dirPath)).toEqual(arrObj);
  });
});
