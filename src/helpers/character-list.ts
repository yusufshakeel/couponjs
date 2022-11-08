import { CharacterSetOptionsType, OmitCharactersType } from '../ts-def/option-type';
import { DEFAULT_OMIT_CHARACTERS } from '../constants';
import { omit, uniqueCharacters } from './index';
import characterSet from '../character-set';

/**
 * This will generate a string of unique characters based on the options provided.
 * @param {CharacterSetOptionsType} characterSetOptions The options to build the character set.
 * @param {OmitCharactersType} omitCharacters The array of characters that will be omitted.
 * @returns {string[]} The set of characters based on the options provided.
 */
export default function characterList(
  characterSetOptions: CharacterSetOptionsType,
  omitCharacters: OmitCharactersType = DEFAULT_OMIT_CHARACTERS
): string[] {
  const { builtIn = [], custom = [] } = characterSetOptions;
  const charactersToOmit = uniqueCharacters(omitCharacters);
  const charactersFromCharacterSetOptions = uniqueCharacters([
    ...builtIn.map(characterSetName => characterSet(characterSetName)),
    ...custom
  ]);
  return omit(charactersFromCharacterSetOptions, charactersToOmit);
}