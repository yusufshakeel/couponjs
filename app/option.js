const {
  DEFAULT_LENGTH,
  DEFAULT_PREFIX,
  DEFAULT_SUFFIX,
  CHARSET_ALPHA,
  DEFAULT_NUMBER_OF_COUPONS_TO_GENERATE,
  DEFAULT_OMIT_CHARACTERS
} = require('./constants.js');

module.exports = {
  length: DEFAULT_LENGTH,
  prefix: DEFAULT_PREFIX,
  suffix: DEFAULT_SUFFIX,
  characterSet: {
    builtIn: [CHARSET_ALPHA]
  },
  numberOfCoupons: DEFAULT_NUMBER_OF_COUPONS_TO_GENERATE,
  omitCharacters: DEFAULT_OMIT_CHARACTERS
};
