'use strict';

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
  switch (charSetName) {
  case CHARSET_ALPHA:
    return ALPHABET_UPPERCASE;
  case CHARSET_ALPHA_LOWER:
    return ALPHABET_LOWERCASE;
  case CHARSET_DIGIT:
    return DIGIT;
  case CHARSET_ALNUM:
    return `${ALPHABET_UPPERCASE}${ALPHABET_LOWERCASE}${DIGIT}`;
  case CHARSET_BINARY:
    return `${BINARY}`;
  case CHARSET_OCTAL:
    return `${OCTAL}`;
  case CHARSET_HEX:
    return `${HEX}`;
  case CHARSET_HEX_LOWER:
    return `${HEX_LOWER}`;
  default:
    throw new Error(`Invalid builtIn characterSet specified. Allowed values: ${validCharSets.join(', ')}`);
  }
}

module.exports = characterSet;
