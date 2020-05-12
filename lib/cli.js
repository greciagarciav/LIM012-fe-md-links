#!/usr/bin/env node
const cli = require('./api/mdLinks-cli');

const [, , route, option1, option2] = process.argv;
// eslint-disable-next-line no-console
cli.ShowCli(route, option1, option2).then((result) => console.log(result));
