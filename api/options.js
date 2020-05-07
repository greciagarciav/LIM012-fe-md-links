const fetch = require('node-fetch');

const ValidateLinks = (arrObjects) => {
  const validatedLinks = arrObjects.map((object) => new Promise((resolve) => {
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
  return Promise.all(validatedLinks);
};

module.exports = {
  ValidateLinks,
};
