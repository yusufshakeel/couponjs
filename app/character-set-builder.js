const characterSet = require('./character-set.js');

/**
 * This will generate a string of unique characters based on the options provided.
 * @param {object} characterSetOptions The options to build the character set.
 * @returns {string} The set of characters based on the options provided.
 */
function characterSetBuilder(characterSetOptions) {
  const {builtIn = [], custom = []} = characterSetOptions;
  return Array.from(new Set([...builtIn.map(charSetName => characterSet(charSetName)), ...custom].join(''))).join('');
}

module.exports = characterSetBuilder;
