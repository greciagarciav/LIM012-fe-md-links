const chalk = require('chalk');
const optionFunctions = require('./options');
const mdLinks = require('./mdLinks');

const ValidateOptionsOK = (option1, option2) => {
  if (option1 !== '--stats' && option1 !== '--validate' && option1 !== undefined) {
    return false;
  }
  if (option2 !== '--stats' && option2 !== '--validate' && option2 !== undefined) {
    return false;
  }
  return true;
};

const HasValidateOption = (option1, option2) => {
  let result = { validate: false };

  if ((option1 === '--validate' || option2 === '--validate') && ValidateOptionsOK(option1, option2)) {
    result = { validate: true };
  }
  return result;
};

const ShowCli = (inputPath, option1, option2) => {
  const hasValidate = HasValidateOption(option1, option2);
  return mdLinks.MarkdownLinks(inputPath, hasValidate)
    .then((response) => {
      let output = '';
      if (response.length === 0) {
        return 'No se encontraron links o archivos md.';
      }
      if (ValidateOptionsOK(option1, option2) === false) {
        return 'No se encontró el comando. Usa md-links --help para conocer todos los comandos.';
      }

      if (option1 === '--stats' || option2 === '--stats') {
        if (hasValidate.validate) {
          return optionFunctions.StatsAndValidate(response);
        }
        return optionFunctions.Stats(response);
      }
      if (hasValidate.validate === false) {
        response.forEach((object) => {
          output += `\n${chalk.bgCyanBright.black(object.file)} ${chalk.greenBright(object.href)} ${chalk.magentaBright(object.text)}`;
        });
        return output;
      }
      if (hasValidate.validate) {
        response.forEach((object) => {
          if (object.ok === 'OK') {
            output += `\n${chalk.bgCyanBright.black(object.file)} ${chalk.yellowBright(object.href)} ${chalk.black.bgGreenBright(object.ok)} ${chalk.greenBright(object.status)} ${chalk.magentaBright(object.text)}  `;
          } else {
            output += `\n${chalk.bgCyanBright.black(object.file)} ${chalk.yellowBright(object.href)} ${chalk.black.bgRedBright(object.ok)} ${chalk.redBright(object.status)} ${chalk.magentaBright(object.text)} `;
          }
        });
      }
      return output;
    })
    .catch(() => 'Ingresa una ruta válida.');
};

module.exports = {
  ShowCli,
};
