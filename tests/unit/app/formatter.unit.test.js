'use strict';

const Formatter = require('../../../app/formatter.js');

const assertFormatterError = (format, expectedError) => {
  try {
    format ? new Formatter(format) : new Formatter();
  } catch (e) {
    expect(e.message).toBe(expectedError.message);
    expect(e.type).toBe(expectedError.type);
    expect(e.errors).toStrictEqual(expectedError.errors);
  }
};

const assertFormatterFormatCouponError = (formatter, coupon, expectedError) => {
  try {
    formatter.format(coupon);
  } catch (e) {
    expect(e.message).toBe(expectedError.message);
    expect(e.type).toBe(expectedError.type);
    expect(e.errors).toStrictEqual(expectedError.errors);
  }
};

test('Should throw error if format rule for formatter is not specified', () => {
  assertFormatterError(undefined, {
    message: 'Format rule is not specified.',
    type: 'COUPONJS_VALIDATION_ERROR',
    errors: [
      {
        message: 'Format rule is not specified.',
        type: 'COUPONJS_FORMAT_ERROR',
        field: 'format'
      }
    ]
  });
});

test('Should throw error if format rule for formatter is of invalid type', () => {
  assertFormatterError(123, {
    message: 'Invalid format rule.',
    type: 'COUPONJS_VALIDATION_ERROR',
    errors: [
      {
        message: 'Invalid format rule.',
        type: 'COUPONJS_FORMAT_ERROR',
        field: 'format'
      }
    ]
  });
});

describe('Format rule of type string', () => {
  test('Should throw error if format rule for formatter contains invalid characters', () => {
    assertFormatterError('x-xa-x', {
      message: 'Invalid characters used in the format rule.',
      type: 'COUPONJS_VALIDATION_ERROR',
      errors: [
        {
          message:
            'Invalid characters used in the format rule. Only x and - are allowed. And only one - inbetween like xxx-xxx.',
          type: 'COUPONJS_FORMAT_ERROR',
          field: 'format'
        }
      ]
    });
  });

  test('Should return separators and groups for valid format rule', () => {
    const formatter = new Formatter('x-x-x');
    expect(formatter.getConfig()).toStrictEqual({
      separators: ['-', '-'],
      groups: [1, 1, 1],
      totalCharactersInGroup: 3
    });
  });

  test('Should throw error if coupon length is not equal to the sum of groups in the format', () => {
    const formatter = new Formatter('xxxx-xxxx-xxxx');
    assertFormatterFormatCouponError(formatter, 'HELLO', {
      message: 'Coupon length is not equal to the sum of groups in the format.',
      type: 'COUPONJS_VALIDATION_ERROR',
      errors: [
        {
          message: 'Coupon length: 5 and sum of groups: 4+4+4 = 12',
          type: 'COUPONJS_FORMAT_ERROR',
          field: 'format'
        }
      ]
    });
  });

  test('Should return formatted coupon', () => {
    const formatter = new Formatter('xxxx-xxxx-xxxx');
    expect(formatter.format('QWERTY123456')).toBe('QWER-TY12-3456');
  });
});

describe('Format rule of type object', () => {
  test('Should throw error if required field separators is not present', () => {
    assertFormatterError(
      {},
      {
        message: "Format object must have field 'separators' of type array.",
        type: 'COUPONJS_VALIDATION_ERROR',
        errors: [
          {
            message: "Format object must have field 'separators' of type array.",
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'separators'
          }
        ]
      }
    );
  });

  test('Should throw error if required field groups is not present', () => {
    assertFormatterError(
      { separators: ['-'] },
      {
        message: "Format object must have field 'groups' of type array.",
        type: 'COUPONJS_VALIDATION_ERROR',
        errors: [
          {
            message: "Format object must have field 'groups' of type array.",
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'groups'
          }
        ]
      }
    );
  });

  test('Should throw error if required field groups is empty array', () => {
    assertFormatterError(
      { separators: ['-'], groups: [] },
      {
        message: "Format object must have at least one element in the array field 'groups'.",
        type: 'COUPONJS_VALIDATION_ERROR',
        errors: [
          {
            message: "Format object must have at least one element in the array field 'groups'.",
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'groups'
          }
        ]
      }
    );
  });

  test('Should throw error if elements in separators array is more than groups', () => {
    assertFormatterError(
      { separators: ['-', '-'], groups: [4] },
      {
        message:
          "Format object must not have 'separators' array with more elements than 'groups' array.",
        type: 'COUPONJS_VALIDATION_ERROR',
        errors: [
          {
            message:
              "Format object must not have 'separators' array with more elements than 'groups' array.",
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'separators'
          }
        ]
      }
    );
  });

  test('Should throw error if elements in separators array is lesser than groups', () => {
    assertFormatterError(
      { separators: ['-'], groups: [4, 4, 4] },
      {
        message:
          "Format object has 3 elements in 'groups' array so, it must have 2 elements in 'separators' array.",
        type: 'COUPONJS_VALIDATION_ERROR',
        errors: [
          {
            message:
              "Format object has 3 elements in 'groups' array so, it must have 2 elements in 'separators' array.",
            type: 'COUPONJS_FORMAT_ERROR',
            field: 'separators'
          }
        ]
      }
    );
  });

  test('Should return formatted coupon', () => {
    const formatter = new Formatter({ separators: ['-', '-'], groups: [4, 4, 4] });
    expect(formatter.format('QWERTY123456')).toBe('QWER-TY12-3456');
  });
});
