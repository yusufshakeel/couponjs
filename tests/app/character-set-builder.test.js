const {ALPHABET_UPPERCASE, ALPHABET_LOWERCASE, DIGIT, CHARSET_DIGIT, CHARSET_ALPHA_LOWER, CHARSET_ALPHA} = require('../../app/constants.js');
const characterSetBuilder = require('../../app/character-set-builder.js');
const defaultOptions = require('../../app/option.js');

test('Should throw error if invalid builtIn option provided', () => {
  expect(() => {
    const option = {
      builtIn: ['UNKNOWN']
    };
    const chars = characterSetBuilder(option);
    throw new Error('Should have failed.');
  }).toThrow('Invalid builtIn characterSet specified. Allowed values ["CHARSET_ALPHA", "CHARSET_ALPHA_LOWER", "CHARSET_DIGIT"]');
});

test('Should return uppercase alphabet A-Z when using default options', () => {
  expect(characterSetBuilder(defaultOptions.characterSet)).toBe(ALPHABET_UPPERCASE);
});

test('Should return uppercase alphabet A-Z when using builtIn "CHARSET_ALPHA" option', () => {
  expect(characterSetBuilder({builtIn: [CHARSET_ALPHA]})).toBe(ALPHABET_UPPERCASE);
});

test('Should return lowercase alphabet a-z when using builtIn "CHARSET_ALPHA_LOWER" option', () => {
  expect(characterSetBuilder({builtIn: [CHARSET_ALPHA_LOWER]})).toBe(ALPHABET_LOWERCASE);
});

test('Should return digits 0-9 when using builtIn "CHARSET_DIGIT" option', () => {
  expect(characterSetBuilder({builtIn: [CHARSET_DIGIT]})).toBe(DIGIT);
});

test('Should return uppercase, lowercase alphabet and digits when using builtIn ["CHARSET_ALPHA", "CHARSET_ALPHA_LOWER", "CHARSET_DIGIT"] option', () => {
  expect(characterSetBuilder({builtIn: [CHARSET_ALPHA, CHARSET_ALPHA_LOWER, CHARSET_DIGIT]})).toBe(`${ALPHABET_UPPERCASE}${ALPHABET_LOWERCASE}${DIGIT}`);
});

test('Should return alphabet ABC when using custom "ABC" option', () => {
  expect(characterSetBuilder({custom: ['ABC']})).toBe('ABC');
});

test('Should return alphabet abc when using custom "abc" option', () => {
  expect(characterSetBuilder({custom: ['abc']})).toBe('abc');
});

test('Should return digits 123 when using custom "123" option', () => {
  expect(characterSetBuilder({custom: ['123']})).toBe('123');
});

test('Should return alphabet uppercase, lowercase and digit "ABCabc123" when using custom ["ABC", "abc", "123"] option', () => {
  expect(characterSetBuilder({custom: ['ABC', 'abc', '123']})).toBe('ABCabc123');
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
