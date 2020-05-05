const path = require('path');
const fs = require('fs');

const ResolvedToAbsolute = (inputPath) => {
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

const arrPathMds = [];
const ReadDir = (inputPath) => {
  const pathAbsolute = ResolvedToAbsolute(inputPath);
  if (fs.existsSync(pathAbsolute)) {
    if (IsPathDIrectory(pathAbsolute) === true) {
      const filesPathsArr = fs.readdirSync(pathAbsolute);
      for (let i = 0; i < filesPathsArr.length; i += 1) {
        const singlePath = path.join(pathAbsolute, filesPathsArr[i]);
        ReadDir(singlePath);
      }
    } else {
      if (path.extname(pathAbsolute) === '.md') {
        arrPathMds.push(pathAbsolute);
      }
    }
  }
  return arrPathMds;
};

const ReadFileGetlinks = (userPath) => {
  const content = fs.readFileSync(userPath, 'utf8');
  // regEx for links inside a .md file
  const linksRegex = /((!?\[[^\]]*?\])\((?:.)*?\))/g;
  const links = content.match(linksRegex);
  let object;
  if (links !== null) {
    object = { userPath, links };
  }
  return object;
};

const ObjLinks = (link, file) => {
  const textRegex = /(?<=\[).+?(?=\])/g;
  const [text] = link.match(textRegex);
  const hrefRegex = /(?<=\().+?(?=\))/g;
  const [href] = link.match(hrefRegex);
  return { file, href, text };
};

const GetArrLinks = (pathsMdArrays) => {
  const linksArray = [];
  pathsMdArrays.forEach((pathMd) => {
    if (ReadFileGetlinks(pathMd) !== undefined) {
      linksArray.push(ReadFileGetlinks(pathMd));
    }
  });
  return linksArray;
};

const GetArrObj = (linksArray) => {
  const objectsArray = [];
  linksArray.forEach((element) => {
    element.links.forEach((link) => objectsArray.push(ObjLinks(link, element.userPath)));
  });
  return objectsArray;
};

const ArrObjects = (pathString) => {
  const arrAllMDPaths = ReadDir(pathString);
  const arrObjectsPathLink = GetArrLinks(arrAllMDPaths);
  const arrObjectsAllLink = GetArrObj(arrObjectsPathLink);
  return arrObjectsAllLink;
};

// console.log(ArrObjects('../lib'));

module.exports = {
  ResolvedToAbsolute,
  IsPathDIrectory,
  ReadDir,
  ReadFileGetlinks,
  ObjLinks,
  GetArrLinks,
  GetArrObj,
  ArrObjects,
};
