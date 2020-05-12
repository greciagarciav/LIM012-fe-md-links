const pathFunctions = require('./path');
const optionFunctions = require('./options');

const MarkdownLinks = (inputPath, options) => new Promise((resolve) => {
  const noValidate = pathFunctions.ArrObjects(inputPath);
  const validate = optionFunctions.Validate(noValidate);
  if (options === undefined) {
    resolve(noValidate);
  } else {
    resolve(validate);
  }
});

// (MarkdownLinks('README.md/')).then((resolve) => console.log(resolve));

module.exports = {
  MarkdownLinks,
};
