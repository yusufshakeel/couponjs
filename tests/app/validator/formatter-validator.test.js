'use strict';

const {
  validateFormatRuleString,
  validateFormatRuleObject,
  hasEqualSumOfGroupsAndCouponLength
} = require('../../../app/validator/formatter-validator.js');

test('Should return true if format rule has valid characters x and -', () => {
  expect(validateFormatRuleString('x')).toStrictEqual({
    validation: 'success',
    data: {
      groups: [1],
      totalCharactersInGroup: 1,
      separators: []
    }
  });
  expect(validateFormatRuleString('x-x')).toStrictEqual({
    validation: 'success',
    data: {
      groups: [1, 1],
      totalCharactersInGroup: 2,
      separators: ['-']
    }
  });
  expect(validateFormatRuleString('xxx-xxx')).toStrictEqual({
    validation: 'success',
    data: {
      groups: [3, 3],
      totalCharactersInGroup: 6,
      separators: ['-']
    }
  });
});

test('Should return false if format rule has invalid characters or structure', () => {
  const error = {
    validation: 'error',
    field: 'format',
    message:
      'Invalid characters used in the format rule. Only x and - are allowed. And only one - inbetween like xxx-xxx.'
  };
  expect(validateFormatRuleString('a')).toStrictEqual(error);
  expect(validateFormatRuleString('-')).toStrictEqual(error);
  expect(validateFormatRuleString('#')).toStrictEqual(error);
  expect(validateFormatRuleString('x-')).toStrictEqual(error);
  expect(validateFormatRuleString('-x')).toStrictEqual(error);
  expect(validateFormatRuleString('x-a')).toStrictEqual(error);
  expect(validateFormatRuleString('x-xa')).toStrictEqual(error);
  expect(validateFormatRuleString('x-a-x')).toStrictEqual(error);
  expect(validateFormatRuleString('x-xa-x')).toStrictEqual(error);
  expect(validateFormatRuleString('X-xa-x')).toStrictEqual(error);
  expect(validateFormatRuleString('xxx---xxx')).toStrictEqual(error);
});

test('Should return true if sum of groups and coupon length are same', () => {
  expect(hasEqualSumOfGroupsAndCouponLength('HELLO', 5)).toBeTruthy();
});

test('Should return false if sum of groups and coupon length are not equal', () => {
  expect(hasEqualSumOfGroupsAndCouponLength('HELLO', 12)).toBeFalsy();
});

test('Should return validation error object if required fields is not present in the format object', () => {
  expect(validateFormatRuleObject({})).toStrictEqual({
    field: 'separators',
    message: "Format object must have field 'separators' of type array.",
    validation: 'error'
  });

  expect(validateFormatRuleObject({ separators: 'invalid' })).toStrictEqual({
    field: 'separators',
    message: "Format object must have field 'separators' of type array.",
    validation: 'error'
  });

  expect(validateFormatRuleObject({ separators: [] })).toStrictEqual({
    field: 'separators',
    message: "Format object must have at least one element in the array field 'separators'.",
    validation: 'error'
  });

  expect(validateFormatRuleObject({ separators: ['-'] })).toStrictEqual({
    field: 'groups',
    message: "Format object must have field 'groups' of type array.",
    validation: 'error'
  });

  expect(
    validateFormatRuleObject({
      separators: ['-'],
      groups: 'invalid'
    })
  ).toStrictEqual({
    field: 'groups',
    message: "Format object must have field 'groups' of type array.",
    validation: 'error'
  });

  expect(
    validateFormatRuleObject({
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
    validateFormatRuleObject({
      separators: ['-'],
      groups: [4, 4]
    })
  ).toStrictEqual({
    validation: 'success',
    data: { groups: [4, 4], totalCharactersInGroup: 8, separators: ['-'] }
  });
});

test('Should return validation error if separators array has equal to or more elements than groups array in format rule object', () => {
  expect(
    validateFormatRuleObject({
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

test('Should return validation error if separators array has lesser number of elements than groups array in format rule object', () => {
  expect(
    validateFormatRuleObject({
      separators: ['-'],
      groups: [4, 4, 4]
    })
  ).toStrictEqual({
    field: 'separators',
    message:
      "Format object has 3 elements in 'groups' array so, it must have 2 elements in 'separators' array.",
    validation: 'error'
  });
});

test('Should return validation error if separators array non-string type elements', () => {
  expect(
    validateFormatRuleObject({
      separators: ['-', 123],
      groups: [4, 4, 4]
    })
  ).toStrictEqual({
    field: 'separators',
    message:
      "Format object must only have string elements in 'separators' array. Found error at index 1.",
    validation: 'error'
  });
});

test('Should return validation error if groups array non-integer type elements', () => {
  expect(
    validateFormatRuleObject({
      separators: ['-', '-'],
      groups: [4, '4', 4]
    })
  ).toStrictEqual({
    field: 'separators',
    message:
      "Format object must only have integer elements in 'groups' array. Found error at index 1.",
    validation: 'error'
  });
});
