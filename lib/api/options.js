const fetch = require('node-fetch');

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
        objValidated.status = '';
        objValidated.ok = 'link does not exist';
        resolve(objValidated);
      });
  }));
  return Promise.all(arrPromises);
};

const Stats = (arrObj) => {
  const total = arrObj.length;
  const unique = new Set(arrObj.map((object) => object.href));
  return `Total:${total} Unique:${unique.size}`;
};

const StatsAndValidate = (arrObj) => {
  const total = arrObj.length;
  const unique = new Set(arrObj.map((object) => object.href));
  const brokenLinks = new Set(arrObj.map((object) => object.status !== 200 || object.status === ''));
  return `Total:${total} Unique:${unique.size} Broken:${brokenLinks.size}`;
};

module.exports = {
  Validate,
  Stats,
  StatsAndValidate,
};
