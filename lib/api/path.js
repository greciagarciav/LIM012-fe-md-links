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
// Obtener arreglo de rutas absolutas de todos los archivos en la ruta
const PathAllFiles = (inputPath) => {
  const pathAbsolute = ResolvedToAbsolute(inputPath);
  // if (fs.existsSync(pathAbsolute)) {
  if (IsPathDIrectory(inputPath) === true) {
    const filesPathsArr = fs.readdirSync(inputPath);
    const allPaths = filesPathsArr.reduce((allPathsArray, currentFilePath) => {
      const absoluteFilePath = path.resolve(inputPath, currentFilePath);
      const pathsArr = PathAllFiles(absoluteFilePath);
      return allPathsArray.concat(pathsArr);
    }, []);
    return allPaths;
  }
  // }
  const filePath = pathAbsolute;
  return [filePath];
};
// Obtener arreglo de rutas absolutas de todos los archivos .md
const PathMdFiles = (arrPathAllFiles) => {
  const arrPathMdFIles = [];
  arrPathAllFiles.forEach((element) => {
    // Si el arreglo contiene archivos md guarda en un nuevo arreglo
    if (path.extname(element) === '.md') {
      arrPathMdFIles.push(element);
    }
  });
  // Retorna arreglo de rutas o ruta de archivos md de lo contrario retorna un arreglo vacío
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
  //  If there are links in md file then save them to an array
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
  const arrPathAllFiles = PathAllFiles(pathString);
  const arrPathMdFiles = PathMdFiles(arrPathAllFiles);
  const arrObjectsPathLink = GetArrLinks(arrPathMdFiles);
  const arrObjectsAllLink = GetArrObj(arrObjectsPathLink);
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
