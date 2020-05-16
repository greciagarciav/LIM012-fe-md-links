const pathFunctions = require('./path');
const optionFunctions = require('./options');

const MarkdownLinks = (inputPath, options) => new Promise((resolve) => {
  let getObjectLinks = pathFunctions.ArrObjects(inputPath);

  if (options.validate) {
    getObjectLinks = optionFunctions.Validate(getObjectLinks);
  }
  resolve(getObjectLinks);
});

module.exports = {
  MarkdownLinks,
};
