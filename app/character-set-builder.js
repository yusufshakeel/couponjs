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
 * This will generate a string of unique characters based on the options provided.
 * @param {object} characterSetOptions The options to build the character set.
 * @returns {string} The set of characters based on the options provided.
 */
function characterSetBuilder(characterSetOptions) {

  /**
   * This will return the characters based on the character set name.
   * @param {string} charSet This is the name of the character set.
   * @returns {string} String of characters.
   */
  function characters(charSet) {
    switch (charSet) {
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
        throw new Error(`Invalid builtIn characterSet specified. Allowed values ["${CHARSET_ALPHA}", "${CHARSET_ALPHA_LOWER}", "${CHARSET_DIGIT}"]`);
    }
  }

  const {builtIn = [], custom = []} = characterSetOptions;

  const builtInCharacters = builtIn.reduce((chars, charSet) => {
    return `${chars}${characters(charSet)}`;
  }, '');

  const customCharacters = custom.reduce((chars, charSet) => {
    return `${chars}${charSet}`;
  }, '');

  const distinctCharacters = `${builtInCharacters}${customCharacters}`.split('').reduce((characters, character) => {
    return characters + (characters.indexOf(character) === -1 ? character : '');
  }, '');

  return `${distinctCharacters}`;
}

module.exports = characterSetBuilder;
