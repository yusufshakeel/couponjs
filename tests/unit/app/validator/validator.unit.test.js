'use strict';

const {
  isOfType,
  isUndefined,
  isInteger,
  isArray,
  isBoolean,
  isString,
  isObject,
  isEmptyArray
} = require('../../../../app/validator/validator.js');

test('Should be able to check the type of the operand', () => {
  const foo = { bar: 'foobar' };
  expect(isOfType('hello', 'string')).toBeTruthy();
  expect(isOfType(123, 'number')).toBeTruthy();
  expect(isOfType(foo.bar, 'string')).toBeTruthy();

  expect(isOfType('123', 'number')).toBeFalsy();
  expect(isOfType(foo.unknown, 'string')).toBeFalsy();
});

test('Should be able to determine that an value is undefined', () => {
  const foo = { bar: 'foobar' };
  expect(isUndefined(foo.bar)).toBeFalsy();
  expect(isUndefined(foo.unknown)).toBeTruthy();
});

test('Should be able to determine that value is integer', () => {
  const foo = { bar: 123 };
  expect(isInteger(0)).toBeTruthy();
  expect(isInteger(123)).toBeTruthy();
  expect(isInteger(1e14)).toBeTruthy();
  expect(isInteger(-1e14)).toBeTruthy();
  expect(isInteger(foo.bar)).toBeTruthy();

  expect(isInteger('123')).toBeFalsy();
  expect(isInteger('123.0')).toBeFalsy();
  expect(isInteger(12.3)).toBeFalsy();
  expect(isInteger(Number.POSITIVE_INFINITY)).toBeFalsy();
  expect(isInteger(Number.NEGATIVE_INFINITY)).toBeFalsy();
  expect(isInteger(foo.unknown)).toBeFalsy();
});

test('Should be able to determine that value is an array', () => {
  expect(isArray([])).toBeTruthy();
  expect(isArray(['a'])).toBeTruthy();
  expect(isArray([1])).toBeTruthy();

  expect(isArray(1)).toBeFalsy();
  expect(isArray('1')).toBeFalsy();
  expect(isArray({})).toBeFalsy();
  expect(isArray(null)).toBeFalsy();
  expect(isArray(undefined)).toBeFalsy();
});

test('Should be able to determine that value is boolean', () => {
  expect(isBoolean(true)).toBeTruthy();
  expect(isBoolean(false)).toBeTruthy();

  expect(isBoolean('true')).toBeFalsy();
  expect(isBoolean('false')).toBeFalsy();
  expect(isBoolean(1)).toBeFalsy();
  expect(isBoolean(0)).toBeFalsy();
  expect(isBoolean({})).toBeFalsy();
  expect(isBoolean([])).toBeFalsy();
  expect(isBoolean(null)).toBeFalsy();
  expect(isBoolean(undefined)).toBeFalsy();
});

test('Should be able to determine that value is string', () => {
  expect(isString('')).toBeTruthy();
  expect(isString('hello')).toBeTruthy();

  expect(isString(true)).toBeFalsy();
  expect(isString(false)).toBeFalsy();
  expect(isString(1)).toBeFalsy();
  expect(isString(0)).toBeFalsy();
  expect(isString({})).toBeFalsy();
  expect(isString([])).toBeFalsy();
  expect(isString(null)).toBeFalsy();
  expect(isString(undefined)).toBeFalsy();
});

test('Should be able to determine that value is an empty array', () => {
  expect(isEmptyArray([])).toBeTruthy();

  expect(isEmptyArray([1])).toBeFalsy();
});

test('Should be able to determine that value is object', () => {
  expect(isObject({})).toBeTruthy();
  expect(isObject({ foo: 'bar' })).toBeTruthy();

  expect(isObject(true)).toBeFalsy();
  expect(isObject(false)).toBeFalsy();
  expect(isObject(1)).toBeFalsy();
  expect(isObject(0)).toBeFalsy();
  expect(isObject(undefined)).toBeFalsy();
  expect(isObject(null)).toBeFalsy();
  expect(isObject(function(){ this.x = 10; })).toBeFalsy();
});
