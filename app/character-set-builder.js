const characterSet = require('./character-set.js');

/**
 * This will generate a string of unique characters based on the options provided.
 * @param {object} characterSetOptions The options to build the character set.
 * @returns {string} The set of characters based on the options provided.
 */
function characterSetBuilder(characterSetOptions) {
  const {builtIn = [], custom = []} = characterSetOptions;

  const builtInCharacters = builtIn.map(charSetName => characterSet(charSetName));

  return [...builtInCharacters, ...custom].reduce((characters, character) => {
    return characters + (characters.indexOf(character) === -1 ? character : '');
  }, '');
}

module.exports = characterSetBuilder;
