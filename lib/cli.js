#!/usr/bin/env node
const commander = require('commander');
const cli = require('./api/mdLinks-cli');

const program = new commander.Command();
program.version('1.0.0').description('Markdown files statistics');
program
  .name('md-links')
  .usage('[options]')
  .option('--validate', 'Muestra los links validados de un archivo Markdown MD')
  .option('--stats', 'Muestra el total de links y la cantidad de links únicos')
  .option('--stats --validate y --validate --stats', 'Muestran el total de links, la cantidad de links únicos y la cantidad de links rotos');
program.parse(process.argv);

const [, , route, option1, option2] = process.argv;
// eslint-disable-next-line no-console
cli.ShowCli(route, option1, option2).then((result) => console.log(result));
