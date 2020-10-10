'use strict';

const { isOfType, isUndefined, isInteger } = require('../../../../app/functional');

test('Should be able to check the type of the operand', () => {
  const foo = { bar: 'foobar' };
  expect(isOfType('hello', 'string')).toBeTruthy();
  expect(isOfType(123, 'number')).toBeTruthy();
  expect(isOfType(foo.bar, 'string')).toBeTruthy();

  expect(isOfType('123', 'number')).toBeFalsy();
  expect(isOfType(foo.unknown, 'string')).toBeFalsy();
});

test('Should be able to determine that an operand is undefined', () => {
  const foo = { bar: 'foobar' };
  expect(isUndefined(foo.bar)).toBeFalsy();
  expect(isUndefined(foo.unknown)).toBeTruthy();
});

test('Should be able to determine that an operand is integer', () => {
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
