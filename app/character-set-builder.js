const characterSet = require('./character-set.js');

/**
 * This will generate a string of unique characters based on the options provided.
 * @param {object} characterSetOptions The options to build the character set.
 * @returns {string} The set of characters based on the options provided.
 */
function characterSetBuilder(characterSetOptions) {
  const {builtIn = [], custom = []} = characterSetOptions;

  const builtInCharacters = builtIn.map(charSetName => characterSet(charSetName)).join('');

  const customCharacters = custom.join('');

  const distinctCharacters = `${builtInCharacters}${customCharacters}`.split('').reduce((characters, character) => {
    return characters + (characters.indexOf(character) === -1 ? character : '');
  }, '');

  return `${distinctCharacters}`;
}

module.exports = characterSetBuilder;
