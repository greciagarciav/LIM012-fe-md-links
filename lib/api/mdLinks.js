const pathFunctions = require('./path');
const optionFunctions = require('./options');

const MarkdownLinks = (inputPath, options) => new Promise((resolve) => {
  let objectLinks = pathFunctions.ArrObjects(inputPath);

  if (options.validate) {
    objectLinks = optionFunctions.Validate(objectLinks);
  }
  resolve(objectLinks);
});

module.exports = {
  MarkdownLinks,
};
