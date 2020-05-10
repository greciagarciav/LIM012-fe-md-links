const path = require('path');
const fs = require('fs');

const ResolvedToAbsolute = (inputPath) => {
  if (path.isAbsolute(inputPath) === false) {
    const pathResolved = path.resolve(inputPath);
    return pathResolved;
  }
  return inputPath;
};

const IsPathDIrectory = (inputPath) => fs.lstatSync(inputPath).isDirectory();

const PathAllFiles = (inputPath) => {
  const pathAbsolute = ResolvedToAbsolute(inputPath);
  if (fs.existsSync(pathAbsolute)) {
    if (IsPathDIrectory(pathAbsolute) === true) {
      const filesPathsArr = fs.readdirSync(inputPath);
      const allPaths = filesPathsArr.reduce((allPathsArray, currentFilePath) => {
        const absoluteFilePath = path.resolve(inputPath, currentFilePath);
        const pathsArr = PathAllFiles(absoluteFilePath);
        return allPathsArray.concat(pathsArr);
      }, []);
      return allPaths;
    }
  }
  const filePath = pathAbsolute;
  return [filePath];
};

const PathMdFiles = (arrPathAllFiles) => {
  const arrPathMdFIles = [];
  arrPathAllFiles.forEach((element) => {
    if (path.extname(element) === '.md') {
      arrPathMdFIles.push(element);
    }
  });
  return arrPathMdFIles;
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

const GetArrObj = (linksArray, pathString) => {
  const objectsArray = [];
  linksArray.forEach((element) => {
    element.links.forEach((link) => objectsArray.push(ObjLinks(link, pathString)));
  });
  return objectsArray;
};

const ArrObjects = (pathString) => {
  const arrPathAllFiles = PathAllFiles(pathString);
  const arrPathMdFiles = PathMdFiles(arrPathAllFiles);
  const arrObjectsPathLink = GetArrLinks(arrPathMdFiles);
  const arrObjectsAllLink = GetArrObj(arrObjectsPathLink, pathString);
  return arrObjectsAllLink;
};

module.exports = {
  ResolvedToAbsolute,
  IsPathDIrectory,
  PathAllFiles,
  PathMdFiles,
  ReadFileGetlinks,
  ObjLinks,
  GetArrLinks,
  GetArrObj,
  ArrObjects,
};
