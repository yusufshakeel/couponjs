'use strict';

const {
  hasValidCharacterInFormatRule,
  hasEqualSumOfGroupsAndCouponLength
} = require('../../../app/validator/formatter-validator.js');

test('Should return true if format rule has valid characters x and -', () => {
  expect(hasValidCharacterInFormatRule('x')).toBeTruthy();
  expect(hasValidCharacterInFormatRule('x-x')).toBeTruthy();
  expect(hasValidCharacterInFormatRule('xxx-xxx')).toBeTruthy();
  expect(hasValidCharacterInFormatRule('xxx---xxx')).toBeTruthy();
});

test('Should return false if format rule has invalid characters or structure', () => {
  expect(hasValidCharacterInFormatRule('a')).toBeFalsy();
  expect(hasValidCharacterInFormatRule('-')).toBeFalsy();
  expect(hasValidCharacterInFormatRule('#')).toBeFalsy();
  expect(hasValidCharacterInFormatRule('x-')).toBeFalsy();
  expect(hasValidCharacterInFormatRule('-x')).toBeFalsy();
  expect(hasValidCharacterInFormatRule('x-a')).toBeFalsy();
  expect(hasValidCharacterInFormatRule('x-xa')).toBeFalsy();
  expect(hasValidCharacterInFormatRule('x-a-x')).toBeFalsy();
  expect(hasValidCharacterInFormatRule('x-xa-x')).toBeFalsy();
  expect(hasValidCharacterInFormatRule('X-xa-x')).toBeFalsy();
});

test('Should return true if sum of groups and coupon length are same', () => {
  expect(hasEqualSumOfGroupsAndCouponLength('HELLO', 5)).toBeTruthy();
});

test('Should return false if sum of groups and coupon length are not equal', () => {
  expect(hasEqualSumOfGroupsAndCouponLength('HELLO', 12)).toBeFalsy();
});
