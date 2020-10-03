'use strict';

const {
  hasValidCharacterInFormatRuleString,
  hasValidPropertiesInFormatRuleObject,
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

test('Should return validation error object if required fields is not present in the format object', () => {
  expect(hasValidPropertiesInFormatRuleObject({})).toStrictEqual({
    field: 'separators',
    message: "Format object must have field 'separators' of type array.",
    validation: 'error'
  });

  expect(hasValidPropertiesInFormatRuleObject({ separators: 'invalid' })).toStrictEqual({
    field: 'separators',
    message: "Format object must have field 'separators' of type array.",
    validation: 'error'
  });

  expect(hasValidPropertiesInFormatRuleObject({ separators: [] })).toStrictEqual({
    field: 'separators',
    message: "Format object must have at least one element in the array field 'separators'.",
    validation: 'error'
  });

  expect(hasValidPropertiesInFormatRuleObject({ separators: ['-'] })).toStrictEqual({
    field: 'groups',
    message: "Format object must have field 'groups' of type array.",
    validation: 'error'
  });

  expect(
    hasValidPropertiesInFormatRuleObject({
      separators: ['-'],
      groups: 'invalid'
    })
  ).toStrictEqual({
    field: 'groups',
    message: "Format object must have field 'groups' of type array.",
    validation: 'error'
  });

  expect(
    hasValidPropertiesInFormatRuleObject({
      separators: ['-'],
      groups: []
    })
  ).toStrictEqual({
    field: 'groups',
    message: "Format object must have at least one element in the array field 'groups'.",
    validation: 'error'
  });
});

test('Should return validation success if all required fields present in the format object', () => {
  expect(
    hasValidPropertiesInFormatRuleObject({
      separators: ['-'],
      groups: [4, 4]
    })
  ).toStrictEqual({
    validation: 'success',
    data: { groups: [4, 4], groupCount: 2, separators: ['-'] }
  });
});

test('Should return validation error if separators array has equal to or more elements then groups array in format rule object', () => {
  expect(
    hasValidPropertiesInFormatRuleObject({
      separators: ['-', '-', '-'],
      groups: [4, 4]
    })
  ).toStrictEqual({
    field: 'separators',
    message:
      "Format object must not have 'separators' array with more elements than 'groups' array.",
    validation: 'error'
  });
});
