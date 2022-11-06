import { DEFAULT_OMIT_CHARACTERS } from './constants';
import characterSet from './character-set';
import { omit, uniqueCharacters } from './helpers';
import { characterSetOptionType, omitCharactersType } from './ts-def/configs/option-type';

/**
 * This will generate a string of unique characters based on the options provided.
 * @param {characterSetOptionType} characterSetOptions The options to build the character set.
 * @param {omitCharactersType} omitCharacters The array of characters that will be omitted.
 * @returns {string} The set of characters based on the options provided.
 */
export default function characterSetBuilder(characterSetOptions: characterSetOptionType, omitCharacters: omitCharactersType = DEFAULT_OMIT_CHARACTERS): string {
  const { builtIn = [], custom = [] } = characterSetOptions;
  const charactersToOmit = uniqueCharacters(omitCharacters);
  const charactersFromCharacterSetOptions = uniqueCharacters([
    ...builtIn.map(characterSetName => characterSet(characterSetName)),
    ...custom
  ]);
  return omit(charactersFromCharacterSetOptions, charactersToOmit).join('');
}