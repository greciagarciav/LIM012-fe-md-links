const commander = require('commander');
const optionFunctions = require('./options');
const mdLinks = require('./mdLinks');

const program = new commander.Command();
program.version('1.0.0').description('Markdown files statistics');
program
  .name('md-links')
  .usage('[options]')
  .option('--validate', 'Muestra los links validados de un archivo Markdown MD')
  .option('--stats', 'Muestra el total de links y la cantidad de links únicos')
  .option('--stats --validate', 'Muestra el total de links, la cantidad de links únicos y la cantidad de links rotos');
program.parse(process.argv);

const GetOption = (option1, option2) => {
  if (option1 === '--validate' && option2 === undefined) {
    return { validate: true };
  }
  if (option1 === '--stats' && option2 === '--validate') {
    return { validate: true };
  }
  return { validate: undefined };
};

const ShowCli = (inputPath, option1, option2) => {
  const validate = GetOption(option1, option2);
  return mdLinks.MarkdownLinks(inputPath, validate)
    .then((response) => {
      let output = '';
      if (response.length === 0) {
        output = 'No se encontraron links o archivos md.';
      }
      if (option1 === '--stats' && option2 === '--validate') {
        output = optionFunctions.StatsAndValidate(response);
      }
      if (option1 === '--stats' && option2 === undefined) {
        output = optionFunctions.Stats(response);
      }
      if (option1 === '--validate' && option2 === undefined) {
        output = mdLinks.MarkdownLinks(inputPath, validate);
      }
      if (option1 === undefined) {
        output = mdLinks.MarkdownLinks(inputPath);
      }
      if (option1 !== '--stats' && option1 !== '--validate' && option1 !== undefined) {
        output = 'No se encontró el comando. Usa md-links --help para recibir información.';
      }
      return output;
    })
    .catch(() => 'Ingresa una ruta válida.');
};

// (ShowCli('path.js')).then((response) => console.log(response));

module.exports = {
  ShowCli,
};
