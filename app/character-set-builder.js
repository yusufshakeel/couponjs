'use strict';

const { DEFAULT_OMIT_CHARACTERS } = require('./constants.js');
const characterSet = require('./character-set.js');

/**
 * This will generate a string of unique characters based on the options provided.
 * @param {object} characterSetOptions The options to build the character set.
 * @param {string[]} omitCharacters The array of characters that will be omitted.
 * @returns {string} The set of characters based on the options provided.
 */
function characterSetBuilder(characterSetOptions, omitCharacters = DEFAULT_OMIT_CHARACTERS) {
  const { builtIn = [], custom = [] } = characterSetOptions;
  const charactersToOmit = [...new Set(omitCharacters.join(''))];
  const charactersFromCharacterSetOptions = [
    ...new Set(
      [...builtIn.map(characterSetName => characterSet(characterSetName)), ...custom].join('')
    )
  ];
  const charactersToUse = charactersFromCharacterSetOptions.filter(
    character => !charactersToOmit.includes(character)
  );
  return charactersToUse.join('');
}

module.exports = characterSetBuilder;
