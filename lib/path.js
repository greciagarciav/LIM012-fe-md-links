const path = require('path');
const fs = require('fs');

const TypePath = (inputPath) => {
  if (path.isAbsolute(inputPath) === false) {
    const pathResolved = path.resolve(inputPath);
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
  const arrMdFiles = [];
  if (IsPathDIrectory(inputPath) === true) {
    const filesPathsArr = fs.readdirSync(inputPath);
    for (let i = 0; i < filesPathsArr.length; i += 1) {
      if (filesPathsArr[i].split('.')[1] === 'md') {
        arrMdFiles.push(filesPathsArr[i]);
      }
    }
  }
  return arrMdFiles;
};

const CheckExtFile = (inputPath) => {
  let extname;
  if (IsPathFile(inputPath) === true) {
    extname = path.extname(inputPath);
  }
  if (extname === '.md') {
    return true;
  }
  return false;
};

const ReadFileGetlinks = (inputPath) => {
  const content = fs.readFileSync(inputPath, 'utf8');
  // This is the regex for links inside a .md file
  const linksRegex = /((!?\[[^\]]*?\])\((?:.)*?\))/g;
  const link = content.match(linksRegex);
  return link || [];
};

const ObjLink = (link, file) => {
  const textRegex = /(?<=\[).+?(?=\])/g;
  const [text] = link.match(textRegex);
  const hrefRegex = /(?<=\().+?(?=\))/g;
  const [href] = link.match(hrefRegex);
  return { file, href, text };
};

module.exports = {
  TypePath,
  IsPathDIrectory,
  IsPathFile,
  ReadDir,
  CheckExtFile,
  ReadFileGetlinks,
  ObjLink,
};
