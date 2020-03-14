const {DEFAULT_LENGTH, DEFAULT_PREFIX, DEFAULT_SUFFIX, ALPHABET_UPPERCASE, CHARSET_ALPHA} = require('./constants.js');

module.exports = {
  length: DEFAULT_LENGTH,
  prefix: DEFAULT_PREFIX,
  suffix: DEFAULT_SUFFIX,
  characterSet: {
    builtIn: [CHARSET_ALPHA]
  }
};