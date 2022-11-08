import {
  ALPHABET_LOWERCASE,
  ALPHABET_UPPERCASE, BINARY, CHARSET_ALNUM,
  CHARSET_ALPHA,
  CHARSET_ALPHA_LOWER, CHARSET_BINARY,
  CHARSET_DIGIT, CHARSET_HEX, CHARSET_HEX_LOWER, CHARSET_OCTAL, DIGIT, HEX, HEX_LOWER, OCTAL
} from '../../../src/constants';
import characterList from '../../../src/helpers/character-list';
import options from '../../../src/configs/option';

const { defaultCouponGenerationOption } = options;

describe('Testing character set builder', () => {
  test('Should throw error if invalid builtIn option provided', () => {
    expect(() => {
      const option = {
        builtIn: ['UNKNOWN']
      };
      characterList(option);
    }).toThrow(
      'Invalid builtIn characterSet specified. Allowed values: CHARSET_ALPHA, CHARSET_ALPHA_LOWER, CHARSET_DIGIT, CHARSET_ALNUM, CHARSET_BINARY, CHARSET_OCTAL, CHARSET_HEX, CHARSET_HEX_LOWER'
    );
  });

  test('Should return uppercase alphabet A-Z when using default options', () => {
    expect(characterList(
      defaultCouponGenerationOption.characterSet
    )).toStrictEqual(ALPHABET_UPPERCASE.split(''));
  });

  test('Should return uppercase alphabet A-Z when using builtIn "CHARSET_ALPHA" option', () => {
    expect(characterList({ builtIn: [CHARSET_ALPHA] })).toStrictEqual(ALPHABET_UPPERCASE.split(''));
  });

  test('Should return lowercase alphabet a-z when using builtIn "CHARSET_ALPHA_LOWER" option', () => {
    expect(characterList({ builtIn: [CHARSET_ALPHA_LOWER] })).toStrictEqual(ALPHABET_LOWERCASE.split(''));
  });

  test('Should return digits 0-9 when using builtIn "CHARSET_DIGIT" option', () => {
    expect(characterList({ builtIn: [CHARSET_DIGIT] })).toStrictEqual(DIGIT.split(''));
  });

  test('Should return uppercase, lowercase alphabet and digits when using builtIn ["CHARSET_ALPHA", "CHARSET_ALPHA_LOWER", "CHARSET_DIGIT"] option', () => {
    expect(
      characterList({
        builtIn: [CHARSET_ALPHA, CHARSET_ALPHA_LOWER, CHARSET_DIGIT]
      })
    ).toStrictEqual(`${ALPHABET_UPPERCASE}${ALPHABET_LOWERCASE}${DIGIT}`.split(''));
  });

  test('Should return alphabet ABC when using custom "ABC" option', () => {
    expect(characterList({ custom: ['ABC'] })).toStrictEqual(['A', 'B', 'C']);
  });

  test('Should return alphabet abc when using custom "abc" option', () => {
    expect(characterList({ custom: ['abc'] })).toStrictEqual(['a', 'b', 'c']);
  });

  test('Should return digits 123 when using custom "123" option', () => {
    expect(characterList({ custom: ['123'] })).toStrictEqual(['1', '2', '3']);
  });

  test('Should return alphabet uppercase, lowercase and digit "ABCabc123" when using custom ["ABC", "abc", "123"] option', () => {
    expect(characterList({ custom: ['ABC', 'abc', '123'] })).toStrictEqual(['A', 'B', 'C', 'a', 'b', 'c', '1', '2', '3']);
  });

  test('Should return both builtIn and custom characters when using custom both options', () => {
    const option = {
      builtIn: [CHARSET_ALPHA, CHARSET_ALPHA_LOWER, CHARSET_DIGIT],
      custom: ['@$%']
    };
    const expectedResult = `${ALPHABET_UPPERCASE}${ALPHABET_LOWERCASE}${DIGIT}@$%`.split('');
    expect(characterList(option)).toStrictEqual(expectedResult);
  });

  test('Should return unique characters when option has duplicate characters', () => {
    const option = {
      builtIn: [CHARSET_ALPHA, CHARSET_ALPHA_LOWER, CHARSET_DIGIT],
      custom: ['ABC', 'abc', 'BCD', 'xyz', '123']
    };
    expect(characterList(option)).toStrictEqual(`${ALPHABET_UPPERCASE}${ALPHABET_LOWERCASE}${DIGIT}`.split(''));
  });

  test('Should return uppercase, lowercase alphabet and digit when using builtIn "CHARSET_ALNUM" option', () => {
    expect(characterList({ builtIn: [CHARSET_ALNUM] })).toStrictEqual(
      `${ALPHABET_UPPERCASE}${ALPHABET_LOWERCASE}${DIGIT}`.split('')
    );
  });

  test('Should return binary characters when using builtIn "CHARSET_BINARY" option', () => {
    expect(characterList({ builtIn: [CHARSET_BINARY] })).toStrictEqual(BINARY.split(''));
  });

  test('Should return octal characters when using builtIn "CHARSET_OCTAL" option', () => {
    expect(characterList({ builtIn: [CHARSET_OCTAL] })).toStrictEqual(OCTAL.split(''));
  });

  test('Should return hex characters when using builtIn "CHARSET_HEX" option', () => {
    expect(characterList({ builtIn: [CHARSET_HEX] })).toStrictEqual(HEX.split(''));
  });

  test('Should return hex lowercase characters when using builtIn "CHARSET_HEX_LOWER" option', () => {
    expect(characterList({ builtIn: [CHARSET_HEX_LOWER] })).toStrictEqual(HEX_LOWER.split(''));
  });

  test('Should be able to omit characters', () => {
    expect(characterList({ custom: ['ABCDEF', '123456'] }, ['AB', '12'])).toStrictEqual('CDEF3456'.split(''));
  });
});