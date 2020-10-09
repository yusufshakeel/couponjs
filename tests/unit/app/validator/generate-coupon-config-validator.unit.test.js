'use strict';

const {
  MIN_LENGTH,
  MAX_LENGTH,
  MIN_NUMBER_OF_COUPONS_TO_GENERATE,
  MAX_NUMBER_OF_COUPONS_TO_GENERATE
} = require('../../../../app/constants.js');
const {
  validateLength,
  validateOmitCharacters,
  validateNumberOfCoupons
} = require('../../../../app/validator/generate-coupon-config-validator.js');

describe('Testing length', () => {
  test('Should throw error if length is not defined', () => {
    expect.assertions(3);
    try {
      validateLength();
    } catch (e) {
      expect(e.message).toBe("The field 'length' number be defined.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'length',
          message: "The field 'length' number be defined.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if length is not of type integer', () => {
    expect.assertions(3);
    try {
      validateLength('invalid');
    } catch (e) {
      expect(e.message).toBe("The field 'length' must be of type integer.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'length',
          message: "The field 'length' must be of type integer.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if length is less than MIN_LENGTH', () => {
    expect.assertions(3);
    try {
      validateLength(MIN_LENGTH - 1);
    } catch (e) {
      expect(e.message).toBe("Minimum value for 'length' is 1.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'length',
          message: "Minimum value for 'length' is 1.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if length is greater than MAX_LENGTH', () => {
    expect.assertions(3);
    try {
      validateLength(MAX_LENGTH + 1);
    } catch (e) {
      expect(e.message).toBe('Maximum value for length is 128.');
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'length',
          message: 'Maximum value for length is 128.',
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should not throw error if length is okay', () => {
    expect(() => validateLength(10)).not.toThrow();
  });
});

describe('Testing numberOfCoupons', () => {
  test('Should throw error if numberOfCoupons is not defined', () => {
    expect.assertions(3);
    try {
      validateNumberOfCoupons();
    } catch (e) {
      expect(e.message).toBe("The field 'numberOfCoupons' number be defined.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message: "The field 'numberOfCoupons' number be defined.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if numberOfCoupons is not of type integer', () => {
    expect.assertions(3);
    try {
      validateNumberOfCoupons('invalid');
    } catch (e) {
      expect(e.message).toBe("The field 'numberOfCoupons' must be of type integer.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message: "The field 'numberOfCoupons' must be of type integer.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if numberOfCoupons is less than minimum value', () => {
    expect.assertions(3);
    try {
      validateNumberOfCoupons(MIN_NUMBER_OF_COUPONS_TO_GENERATE - 1);
    } catch (e) {
      expect(e.message).toBe('Minimum value for numberOfCoupons is 1.');
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message: 'Minimum value for numberOfCoupons is 1.',
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if numberOfCoupons is greater than maximum value', () => {
    expect.assertions(3);
    try {
      validateNumberOfCoupons(
        MAX_NUMBER_OF_COUPONS_TO_GENERATE + 1,
        MAX_NUMBER_OF_COUPONS_TO_GENERATE
      );
    } catch (e) {
      expect(e.message).toBe('Maximum value for numberOfCoupons is 100000.');
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message: 'Maximum value for numberOfCoupons is 100000.',
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should not throw error if number is okay', () => {
    expect(() => validateNumberOfCoupons(10)).not.toThrow();
  });
});

describe('Testing omitCharacters', () => {
  test('Should throw error if omitCharacters is not defined', () => {
    expect.assertions(3);
    try {
      validateOmitCharacters();
    } catch (e) {
      expect(e.message).toBe("The field 'omitCharacters' number be defined.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'omitCharacters',
          message: "The field 'omitCharacters' number be defined.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if omitCharacters is not of type array', () => {
    expect.assertions(3);
    try {
      validateOmitCharacters('invalid');
    } catch (e) {
      expect(e.message).toBe("The field 'omitCharacters' must be of type array.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'omitCharacters',
          message: "The field 'omitCharacters' must be of type array.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if omitCharacters has non-string elements', () => {
    expect.assertions(3);
    try {
      validateOmitCharacters(['A', 1, 'B', 2]);
    } catch (e) {
      expect(e.message).toBe("The field 'omitCharacters' must be an array of strings.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'omitCharacters',
          message:
            "The field 'omitCharacters' must be an array of string. Non-string value found at index 1.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        },
        {
          field: 'omitCharacters',
          message:
            "The field 'omitCharacters' must be an array of string. Non-string value found at index 3.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should not throw error if omitCharacters is okay', () => {
    expect(() => validateOmitCharacters(['A'])).not.toThrow();
  });
});
