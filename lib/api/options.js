const fetch = require('node-fetch');
const chalk = require('chalk');

const Validate = (arrObjects) => {
  const arrPromises = arrObjects.map((object) => new Promise((resolve) => {
    const objValidated = { ...object };
    fetch(object.href)
      .then((res) => {
        if (res.ok) {
          objValidated.status = res.status;
          objValidated.ok = res.statusText;
          resolve(objValidated);
        } else {
          objValidated.status = res.status;
          objValidated.ok = res.statusText;
          resolve(objValidated);
        }
      })
      .catch(() => {
        objValidated.status = 'error';
        objValidated.ok = 'link does not exist';
        resolve(objValidated);
      });
  }));
  return Promise.all(arrPromises);
};

const Stats = (arrObj) => {
  const total = arrObj.length;
  const unique = new Set(arrObj.map((object) => object.href));
  return `${chalk.cyanBright.bold('Total:')} ${chalk.white.bold(total)} \n${chalk.cyanBright.bold('Unique:')} ${chalk.white.bold(unique.size)}`;
};

const StatsAndValidate = (arrObj) => {
  const total = arrObj.length;
  const unique = new Set(arrObj.map((object) => object.href));
  const brokenLinks = new Set(arrObj.filter((object) => object.status !== 200 || object.status === ''));
  return `${chalk.cyanBright.bold('Total:')} ${chalk.white.bold(total)} \n${chalk.cyanBright.bold('Unique:')} ${chalk.white.bold(unique.size)} \n${chalk.cyanBright.bold('Broken:')} ${chalk.white.bold(brokenLinks.size)}`;
};

module.exports = {
  Validate,
  Stats,
  StatsAndValidate,
};
