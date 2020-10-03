'use strict';

const ValidationError = require('./error/validation-error.js');

const {
  ALPHABET_UPPERCASE,
  ALPHABET_LOWERCASE,
  DIGIT,
  BINARY,
  OCTAL,
  HEX,
  HEX_LOWER,
  CHARSET_ALPHA,
  CHARSET_ALPHA_LOWER,
  CHARSET_DIGIT,
  CHARSET_ALNUM,
  CHARSET_BINARY,
  CHARSET_OCTAL,
  CHARSET_HEX,
  CHARSET_HEX_LOWER
} = require('./constants.js');

/**
 * This will return the characters based on the character set name.
 * @param {string} charSetName This is the name of the character set.
 * @returns {string} String of characters.
 */
function characterSet(charSetName) {
  const validCharSets = [
    CHARSET_ALPHA,
    CHARSET_ALPHA_LOWER,
    CHARSET_DIGIT,
    CHARSET_ALNUM,
    CHARSET_BINARY,
    CHARSET_OCTAL,
    CHARSET_HEX,
    CHARSET_HEX_LOWER
  ];
  const possibleCharacterSets = {
    [CHARSET_ALPHA]: ALPHABET_UPPERCASE,
    [CHARSET_ALPHA_LOWER]: ALPHABET_LOWERCASE,
    [CHARSET_DIGIT]: DIGIT,
    [CHARSET_ALNUM]: `${ALPHABET_UPPERCASE}${ALPHABET_LOWERCASE}${DIGIT}`,
    [CHARSET_BINARY]: BINARY,
    [CHARSET_OCTAL]: OCTAL,
    [CHARSET_HEX]: HEX,
    [CHARSET_HEX_LOWER]: HEX_LOWER
  };
  const matchingCharacterSet = possibleCharacterSets[charSetName];
  if (!matchingCharacterSet) {
    throw new ValidationError({
      message: `Invalid builtIn characterSet specified. Allowed values: ${validCharSets.join(
        ', '
      )}`,
      errors: [{ field: 'builtIn', message: `Invalid character set ${charSetName}` }]
    });
  }
  return matchingCharacterSet;
}

module.exports = characterSet;
