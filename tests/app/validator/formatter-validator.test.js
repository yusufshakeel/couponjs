'use strict';

const {
  hasValidCharacterInFormatRuleString,
  hasEqualSumOfGroupsAndCouponLength
} = require('../../../app/validator/formatter-validator.js');

test('Should return true if format rule has valid characters x and -', () => {
  expect(hasValidCharacterInFormatRuleString('x')).toBeTruthy();
  expect(hasValidCharacterInFormatRuleString('x-x')).toBeTruthy();
  expect(hasValidCharacterInFormatRuleString('xxx-xxx')).toBeTruthy();
  expect(hasValidCharacterInFormatRuleString('xxx---xxx')).toBeTruthy();
});

test('Should return false if format rule has invalid characters or structure', () => {
  expect(hasValidCharacterInFormatRuleString('a')).toBeFalsy();
  expect(hasValidCharacterInFormatRuleString('-')).toBeFalsy();
  expect(hasValidCharacterInFormatRuleString('#')).toBeFalsy();
  expect(hasValidCharacterInFormatRuleString('x-')).toBeFalsy();
  expect(hasValidCharacterInFormatRuleString('-x')).toBeFalsy();
  expect(hasValidCharacterInFormatRuleString('x-a')).toBeFalsy();
  expect(hasValidCharacterInFormatRuleString('x-xa')).toBeFalsy();
  expect(hasValidCharacterInFormatRuleString('x-a-x')).toBeFalsy();
  expect(hasValidCharacterInFormatRuleString('x-xa-x')).toBeFalsy();
  expect(hasValidCharacterInFormatRuleString('X-xa-x')).toBeFalsy();
});

test('Should return true if sum of groups and coupon length are same', () => {
  expect(hasEqualSumOfGroupsAndCouponLength('HELLO', 5)).toBeTruthy();
});

test('Should return false if sum of groups and coupon length are not equal', () => {
  expect(hasEqualSumOfGroupsAndCouponLength('HELLO', 12)).toBeFalsy();
});
