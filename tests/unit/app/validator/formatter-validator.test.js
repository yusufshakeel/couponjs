'use strict';

const {
  validateFormatRuleString,
  validateFormatRuleObject,
  hasEqualSumOfGroupsAndCouponLength
} = require('../../../../app/validator/formatter-validator.js');

describe('Testing format rule of string type', () => {
  test('Should return computed properties if format rule has valid characters', () => {
    expect(validateFormatRuleString('x')).toStrictEqual({
      groups: [1],
      totalCharactersInGroup: 1,
      separators: []
    });
    expect(validateFormatRuleString('x-x')).toStrictEqual({
      groups: [1, 1],
      totalCharactersInGroup: 2,
      separators: ['-']
    });
    expect(validateFormatRuleString('xxx-xxx')).toStrictEqual({
      groups: [3, 3],
      totalCharactersInGroup: 6,
      separators: ['-']
    });
  });

  test('Should throw error if format rule has invalid characters or structure', () => {
    const assertErrorForFormatRuleOfTypeString = format => {
      try {
        validateFormatRuleString(format);
      } catch (e) {
        expect(e.message).toBe('Invalid characters used in the format rule.');
        expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
        expect(e.errors).toStrictEqual([
          {
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'format',
            message:
              'Invalid characters used in the format rule. Only x and - are allowed. And only one - inbetween like xxx-xxx.'
          }
        ]);
      }
    };

    assertErrorForFormatRuleOfTypeString('a');
    assertErrorForFormatRuleOfTypeString('-');
    assertErrorForFormatRuleOfTypeString('#');
    assertErrorForFormatRuleOfTypeString('x-');
    assertErrorForFormatRuleOfTypeString('-x');
    assertErrorForFormatRuleOfTypeString('x-a');
    assertErrorForFormatRuleOfTypeString('x-xa');
    assertErrorForFormatRuleOfTypeString('x-a-x');
    assertErrorForFormatRuleOfTypeString('x-xa-x');
    assertErrorForFormatRuleOfTypeString('X-xa-x');
    assertErrorForFormatRuleOfTypeString('xxx---xxx');
  });
});

describe('Testing format rule of object type', () => {
  const assertErrorForFormatRuleOfTypeObject = (format, expectedError) => {
    try {
      validateFormatRuleObject(format);
    } catch (e) {
      expect(e.message).toBe(expectedError.message);
      expect(e.type).toBe(expectedError.type);
      expect(e.errors).toStrictEqual(expectedError.errors);
    }
  };

  test('Should throw validation error if required fields are not present in the format object or have invalid values', () => {
    assertErrorForFormatRuleOfTypeObject(
      {},
      {
        message: "Format object must have field 'separators' of type array.",
        type: 'COUPONJS_VALIDATION_ERROR',
        errors: [
          {
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'separators',
            message: `Format object must have field 'separators' of type array.`
          }
        ]
      }
    );

    assertErrorForFormatRuleOfTypeObject(
      { separators: 'invalid' },
      {
        message: "Format object must have field 'separators' of type array.",
        type: 'COUPONJS_VALIDATION_ERROR',
        errors: [
          {
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'separators',
            message: "Format object must have field 'separators' of type array."
          }
        ]
      }
    );

    assertErrorForFormatRuleOfTypeObject(
      { separators: ['-'] },
      {
        message: "Format object must have field 'groups' of type array.",
        type: 'COUPONJS_VALIDATION_ERROR',
        errors: [
          {
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'groups',
            message: "Format object must have field 'groups' of type array."
          }
        ]
      }
    );

    assertErrorForFormatRuleOfTypeObject(
      {
        separators: ['-'],
        groups: 'invalid'
      },
      {
        message: "Format object must have field 'groups' of type array.",
        type: 'COUPONJS_VALIDATION_ERROR',
        errors: [
          {
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'groups',
            message: "Format object must have field 'groups' of type array."
          }
        ]
      }
    );

    assertErrorForFormatRuleOfTypeObject(
      {
        separators: ['-'],
        groups: []
      },
      {
        message: "Format object must have at least one element in the array field 'groups'.",
        type: 'COUPONJS_VALIDATION_ERROR',
        errors: [
          {
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'groups',
            message: "Format object must have at least one element in the array field 'groups'."
          }
        ]
      }
    );
  });

  test('Should throw validation error if separators array has equal to or more elements than groups array in format rule object', () => {
    assertErrorForFormatRuleOfTypeObject(
      {
        separators: ['-', '-', '-'],
        groups: [4, 4]
      },
      {
        message:
          "Format object must not have 'separators' array with more elements than 'groups' array.",
        type: 'COUPONJS_VALIDATION_ERROR',
        errors: [
          {
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'separators',
            message:
              "Format object must not have 'separators' array with more elements than 'groups' array."
          }
        ]
      }
    );
  });

  test('Should throw validation error if separators array has lesser number of elements than groups array in format rule object', () => {
    assertErrorForFormatRuleOfTypeObject(
      {
        separators: ['-'],
        groups: [4, 4, 4]
      },
      {
        message:
          "Format object has 3 elements in 'groups' array so, it must have 2 elements in 'separators' array.",
        type: 'COUPONJS_VALIDATION_ERROR',
        errors: [
          {
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'separators',
            message:
              "Format object has 3 elements in 'groups' array so, it must have 2 elements in 'separators' array."
          }
        ]
      }
    );
  });

  test('Should throw validation error if separators array non-string type elements', () => {
    assertErrorForFormatRuleOfTypeObject(
      {
        separators: ['-', 123],
        groups: [4, 4, 4]
      },
      {
        message: "Format object has errors in 'separators' field.",
        type: 'COUPONJS_VALIDATION_ERROR',
        errors: [
          {
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'separators',
            message:
              "Format object must only have string elements in 'separators' array. Found error at index 1."
          }
        ]
      }
    );
  });

  test('Should throw validation error if groups array non-integer type elements', () => {
    assertErrorForFormatRuleOfTypeObject(
      {
        separators: ['-', '-'],
        groups: [4, '4', 4]
      },
      {
        message: "Format object has errors in 'groups' field.",
        type: 'COUPONJS_VALIDATION_ERROR',
        errors: [
          {
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'groups',
            message:
              "Format object must only have integer elements in 'groups' array. Found error at index 1."
          }
        ]
      }
    );
  });

  test('Should return computed properties if all required fields present in the format object', () => {
    expect(
      validateFormatRuleObject({
        separators: ['-'],
        groups: [4, 4]
      })
    ).toStrictEqual({ groups: [4, 4], totalCharactersInGroup: 8, separators: ['-'] });
  });
});

describe('Testing coupon length and sum of all the groups', () => {
  test('Should return true if sum of groups and coupon length are same', () => {
    expect(hasEqualSumOfGroupsAndCouponLength('HELLO', 5)).toBeTruthy();
  });

  test('Should return false if sum of groups and coupon length are not equal', () => {
    expect(hasEqualSumOfGroupsAndCouponLength('HELLO', 12)).toBeFalsy();
  });
});
