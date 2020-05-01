const path = require('path');
const fs = require('fs');

const IsPathAbsolute = (inputPath) => path.isAbsolute(inputPath);

const ResolveAbsolute = (inputPath) => path.resolve(inputPath);

const TypePath = (inputPath) => {
  if (IsPathAbsolute(inputPath) === false) {
    const pathResolved = ResolveAbsolute(inputPath);
    return pathResolved;
  }
  return inputPath;
};

const IsPathDIrectory = (inputPath) => {
  if (fs.lstatSync(inputPath).isDirectory()) {
    return true;
  }
  return false;
};

const IsPathFile = (inputPath) => {
  if (fs.lstatSync(inputPath).isFile()) {
    return true;
  }
  return false;
};

const ReadDir = (inputPath) => {
  if (IsPathDIrectory(inputPath) === true) {
    return new Promise((resolve, reject) => {
      fs.readdir(inputPath, (error, files) => {
        error ? reject(error) : resolve(files);
        console.log(files);
      });
    });
  }
};

const CheckExtFile = (inputPath) => {
  if (IsPathFile(inputPath) === true) {
    const extname = path.extname(inputPath);
    if (extname === '.md') {
      return true;
    }
    return false;
  }
};

const ReadMdFile = (inputPath) => {
  if (CheckExtFile(inputPath) === true) {
    fs.readFile(inputPath, 'utf8', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  }
};

module.exports = {
  TypePath,
  IsPathDIrectory,
  IsPathFile,
  ReadDir,
  CheckExtFile,
  ReadMdFile,
};
