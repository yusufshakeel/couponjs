import { ERROR_CONSTANTS } from './constants/error-constants';
import ValidationError from './error/validation-error';
import {
  ALPHABET_UPPERCASE,
  ALPHABET_LOWERCASE,
  ALNUM,
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
} from './constants';
import { PossibleCharacterSetType } from './ts-def/possible-character-set-type';

/**
 * This will return the characters based on the character set name.
 * @param {string} charSetName This is the name of the character set.
 * @returns {string} String of characters.
 */
export default function characterSet(charSetName: string): string {
  const possibleCharacterSets: PossibleCharacterSetType = {
    [CHARSET_ALPHA]: ALPHABET_UPPERCASE,
    [CHARSET_ALPHA_LOWER]: ALPHABET_LOWERCASE,
    [CHARSET_DIGIT]: DIGIT,
    [CHARSET_ALNUM]: ALNUM,
    [CHARSET_BINARY]: BINARY,
    [CHARSET_OCTAL]: OCTAL,
    [CHARSET_HEX]: HEX,
    [CHARSET_HEX_LOWER]: HEX_LOWER
  };
  const validCharSets: string[] = Object.keys(possibleCharacterSets);
  type possibleCharacterSetsObjectKey = keyof typeof possibleCharacterSets;
  const matchingCharacterSet = possibleCharacterSets[charSetName as possibleCharacterSetsObjectKey];
  if (!matchingCharacterSet) {
    const message = `Invalid builtIn characterSet specified. Allowed values: ${validCharSets.join(', ')}`;
    throw new ValidationError({
      message,
      errors: [
        {
          type: ERROR_CONSTANTS.COUPONJS_CHARACTER_SET_ERROR.type,
          field: 'builtIn',
          message: `Invalid character set ${charSetName}`
        }
      ]
    });
  }
  return matchingCharacterSet;
}