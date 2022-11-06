import {
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
} from '../../src/constants';
import characterSetBuilder from '../../src/character-set-builder';
import options from '../../src/configs/option';

const { defaultCouponGenerationOption } = options;

describe('Testing character set builder', () => {
  test('Should throw error if invalid builtIn option provided', () => {
    expect(() => {
      const option = {
        builtIn: ['UNKNOWN']
      };
      characterSetBuilder(option);
    }).toThrow(
      'Invalid builtIn characterSet specified. Allowed values: CHARSET_ALPHA, CHARSET_ALPHA_LOWER, CHARSET_DIGIT, CHARSET_ALNUM, CHARSET_BINARY, CHARSET_OCTAL, CHARSET_HEX, CHARSET_HEX_LOWER'
    );
  });

  test('Should return uppercase alphabet A-Z when using default options', () => {
    expect(characterSetBuilder(
      defaultCouponGenerationOption.characterSet
    )).toBe(ALPHABET_UPPERCASE);
  });

  test('Should return uppercase alphabet A-Z when using builtIn "CHARSET_ALPHA" option', () => {
    expect(characterSetBuilder({ builtIn: [CHARSET_ALPHA] })).toBe(ALPHABET_UPPERCASE);
  });

  test('Should return lowercase alphabet a-z when using builtIn "CHARSET_ALPHA_LOWER" option', () => {
    expect(characterSetBuilder({ builtIn: [CHARSET_ALPHA_LOWER] })).toBe(ALPHABET_LOWERCASE);
  });

  test('Should return digits 0-9 when using builtIn "CHARSET_DIGIT" option', () => {
    expect(characterSetBuilder({ builtIn: [CHARSET_DIGIT] })).toBe(DIGIT);
  });

  test('Should return uppercase, lowercase alphabet and digits when using builtIn ["CHARSET_ALPHA", "CHARSET_ALPHA_LOWER", "CHARSET_DIGIT"] option', () => {
    expect(
      characterSetBuilder({
        builtIn: [CHARSET_ALPHA, CHARSET_ALPHA_LOWER, CHARSET_DIGIT]
      })
    ).toBe(`${ALPHABET_UPPERCASE}${ALPHABET_LOWERCASE}${DIGIT}`);
  });

  test('Should return alphabet ABC when using custom "ABC" option', () => {
    expect(characterSetBuilder({ custom: ['ABC'] })).toBe('ABC');
  });

  test('Should return alphabet abc when using custom "abc" option', () => {
    expect(characterSetBuilder({ custom: ['abc'] })).toBe('abc');
  });

  test('Should return digits 123 when using custom "123" option', () => {
    expect(characterSetBuilder({ custom: ['123'] })).toBe('123');
  });

  test('Should return alphabet uppercase, lowercase and digit "ABCabc123" when using custom ["ABC", "abc", "123"] option', () => {
    expect(characterSetBuilder({ custom: ['ABC', 'abc', '123'] })).toBe('ABCabc123');
  });

  test('Should return both builtIn and custom characters when using custom both options', () => {
    const option = {
      builtIn: [CHARSET_ALPHA, CHARSET_ALPHA_LOWER, CHARSET_DIGIT],
      custom: ['@$%']
    };
    const expectedResult = `${ALPHABET_UPPERCASE}${ALPHABET_LOWERCASE}${DIGIT}@$%`;
    expect(characterSetBuilder(option)).toBe(expectedResult);
  });

  test('Should return unique characters when option has duplicate characters', () => {
    const option = {
      builtIn: [CHARSET_ALPHA, CHARSET_ALPHA_LOWER, CHARSET_DIGIT],
      custom: ['ABC', 'abc', 'BCD', 'xyz', '123']
    };
    expect(characterSetBuilder(option)).toBe(`${ALPHABET_UPPERCASE}${ALPHABET_LOWERCASE}${DIGIT}`);
  });

  test('Should return uppercase, lowercase alphabet and digit when using builtIn "CHARSET_ALNUM" option', () => {
    expect(characterSetBuilder({ builtIn: [CHARSET_ALNUM] })).toBe(
      `${ALPHABET_UPPERCASE}${ALPHABET_LOWERCASE}${DIGIT}`
    );
  });

  test('Should return binary characters when using builtIn "CHARSET_BINARY" option', () => {
    expect(characterSetBuilder({ builtIn: [CHARSET_BINARY] })).toBe(BINARY);
  });

  test('Should return octal characters when using builtIn "CHARSET_OCTAL" option', () => {
    expect(characterSetBuilder({ builtIn: [CHARSET_OCTAL] })).toBe(OCTAL);
  });

  test('Should return hex characters when using builtIn "CHARSET_HEX" option', () => {
    expect(characterSetBuilder({ builtIn: [CHARSET_HEX] })).toBe(HEX);
  });

  test('Should return hex lowercase characters when using builtIn "CHARSET_HEX_LOWER" option', () => {
    expect(characterSetBuilder({ builtIn: [CHARSET_HEX_LOWER] })).toBe(HEX_LOWER);
  });

  test('Should be able to omit characters', () => {
    expect(characterSetBuilder({ custom: ['ABCDEF', '123456'] }, ['AB', '12'])).toBe('CDEF3456');
  });
});