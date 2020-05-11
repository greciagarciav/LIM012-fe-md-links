module.exports = {
  env: {
    es6: true,
    node: true,
    commonjs: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    "linebreak-style": 0,
    "no-lonely-if": 0,
    // "max-len": 0
  },
};
