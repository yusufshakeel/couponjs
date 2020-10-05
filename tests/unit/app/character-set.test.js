'use strict';

const characterSet = require('../../../app/character-set.js');
const {
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
} = require('../../../app/constants.js');

test('Should throw error if invalid charSetName provided', () => {
  expect.assertions(3);
  try {
    characterSet('UNKNOWN');
  } catch (e) {
    expect(e.message).toBe(
      'Invalid builtIn characterSet specified. Allowed values: CHARSET_ALPHA, CHARSET_ALPHA_LOWER, CHARSET_DIGIT, CHARSET_ALNUM, CHARSET_BINARY, CHARSET_OCTAL, CHARSET_HEX, CHARSET_HEX_LOWER'
    );
    expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
    expect(e.errors).toStrictEqual([
      {
        type: 'COUPONJS_CHARACTER_SET_ERROR',
        field: 'builtIn',
        message: 'Invalid character set UNKNOWN'
      }
    ]);
  }
});

test('Should return uppercase alphabet A-Z when using charSetName "CHARSET_ALPHA"', () => {
  expect(characterSet(CHARSET_ALPHA)).toBe(ALPHABET_UPPERCASE);
});

test('Should return lowercase alphabet a-z when using charSetName "CHARSET_ALPHA_LOWER"', () => {
  expect(characterSet(CHARSET_ALPHA_LOWER)).toBe(ALPHABET_LOWERCASE);
});

test('Should return digits 0-9 when using charSetName "CHARSET_DIGIT"', () => {
  expect(characterSet(CHARSET_DIGIT)).toBe(DIGIT);
});

test('Should return uppercase, lowercase alphabet and digit when using charSetName "CHARSET_ALNUM"', () => {
  expect(characterSet(CHARSET_ALNUM)).toBe(`${ALPHABET_UPPERCASE}${ALPHABET_LOWERCASE}${DIGIT}`);
});

test('Should return binary characters when using charSetName "CHARSET_BINARY"', () => {
  expect(characterSet(CHARSET_BINARY)).toBe(BINARY);
});

test('Should return octal characters when using charSetName "CHARSET_OCTAL"', () => {
  expect(characterSet(CHARSET_OCTAL)).toBe(OCTAL);
});

test('Should characterSet hex characters when using charSetName "CHARSET_HEX"', () => {
  expect(characterSet(CHARSET_HEX)).toBe(HEX);
});

test('Should return hex lowercase characters when using charSetName "CHARSET_HEX_LOWER"', () => {
  expect(characterSet(CHARSET_HEX_LOWER)).toBe(HEX_LOWER);
});
