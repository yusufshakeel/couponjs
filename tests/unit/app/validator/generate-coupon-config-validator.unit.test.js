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
  validateNumberOfCoupons,
  validatePrefix,
  validateSuffix,
  validateCharacterSetOption
} = require('../../../../app/validator/generate-coupon-config-validator.js');

describe('Testing length', () => {
  test('Should throw error if length is not defined', () => {
    expect.assertions(3);
    try {
      validateLength();
    } catch (e) {
      expect(e.message).toBe("The field 'length' must be defined.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'length',
          message: "The field 'length' must be defined.",
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
      expect(e.message).toBe("The field 'numberOfCoupons' must be defined.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message: "The field 'numberOfCoupons' must be defined.",
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

  test('Should throw error if numberOfCoupons is greater than total number of possible coupons that can be generated', () => {
    expect.assertions(3);
    try {
      validateNumberOfCoupons(1000, MAX_NUMBER_OF_COUPONS_TO_GENERATE, 100);
    } catch (e) {
      expect(e.message).toBe(
        'Total number of possible coupons that can be generated is 100 for the given length and characterSet.'
      );
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message:
            'Total number of possible coupons that can be generated is 100 for the given length and characterSet.',
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
      expect(e.message).toBe("The field 'omitCharacters' must be defined.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'omitCharacters',
          message: "The field 'omitCharacters' must be defined.",
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

describe('Testing prefix', () => {
  test('Should throw error if prefix is not defined', () => {
    expect.assertions(3);
    try {
      validatePrefix();
    } catch (e) {
      expect(e.message).toBe("The field 'prefix' must be defined.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'prefix',
          message: "The field 'prefix' must be defined.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if prefix is not of type string', () => {
    expect.assertions(3);
    try {
      validatePrefix(123);
    } catch (e) {
      expect(e.message).toBe("The field 'prefix' must be of type string.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'prefix',
          message: "The field 'prefix' must be of type string.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should not throw error if prefix is valid', () => {
    expect(() => {
      validatePrefix('HELLO');
    }).not.toThrow();
  });
});

describe('Testing suffix', () => {
  test('Should throw error if suffix is not defined', () => {
    expect.assertions(3);
    try {
      validateSuffix();
    } catch (e) {
      expect(e.message).toBe("The field 'suffix' must be defined.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'suffix',
          message: "The field 'suffix' must be defined.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if suffix is not of type string', () => {
    expect.assertions(3);
    try {
      validateSuffix(123);
    } catch (e) {
      expect(e.message).toBe("The field 'suffix' must be of type string.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'suffix',
          message: "The field 'suffix' must be of type string.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should not throw error if suffix is valid', () => {
    expect(() => {
      validateSuffix('WORLD');
    }).not.toThrow();
  });
});

describe('Testing characterSetOption', () => {
  test('Should throw error if character set option is not defined', () => {
    expect.assertions(3);
    try {
      validateCharacterSetOption();
    } catch (e) {
      expect(e.message).toBe("The field 'characterSet' must be defined.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'characterSet',
          message: "The field 'characterSet' must be defined.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if character set is not an object', () => {
    expect.assertions(3);
    try {
      validateCharacterSetOption('invalid');
    } catch (e) {
      expect(e.message).toBe("The field 'characterSet' must be of type object.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'characterSet',
          message: "The field 'characterSet' must be of type object.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if characterSet.builtIn is not of type array', () => {
    expect.assertions(3);
    try {
      validateCharacterSetOption({ builtIn: 'invalid' });
    } catch (e) {
      expect(e.message).toBe("The field 'characterSet.builtIn' must be an array.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'characterSet.builtIn',
          message: "The field 'characterSet.builtIn' must be an array.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if characterSet.builtIn is has invalid value', () => {
    expect.assertions(3);
    try {
      validateCharacterSetOption({ builtIn: ['A', 1, 2, 'B'] });
    } catch (e) {
      expect(e.message).toBe("The field 'characterSet.builtIn' must be an array of strings.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'characterSet.builtIn',
          message:
            "The field 'characterSet.builtIn' must be an array of string. Non-string value found at index 1.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        },
        {
          field: 'characterSet.builtIn',
          message:
            "The field 'characterSet.builtIn' must be an array of string. Non-string value found at index 2.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if characterSet.custom is not of type array', () => {
    expect.assertions(3);
    try {
      validateCharacterSetOption({ custom: 'invalid' });
    } catch (e) {
      expect(e.message).toBe("The field 'characterSet.custom' must be an array.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'characterSet.custom',
          message: "The field 'characterSet.custom' must be an array.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if characterSet.custom is has invalid value', () => {
    expect.assertions(3);
    try {
      validateCharacterSetOption({ custom: ['A', 1, 'B', 2] });
    } catch (e) {
      expect(e.message).toBe("The field 'characterSet.custom' must be an array of strings.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'characterSet.custom',
          message:
            "The field 'characterSet.custom' must be an array of string. Non-string value found at index 1.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        },
        {
          field: 'characterSet.custom',
          message:
            "The field 'characterSet.custom' must be an array of string. Non-string value found at index 3.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should be able to return characterSetOption that is valid and has builtIn, custom fields', () => {
    expect(
      validateCharacterSetOption({ builtIn: ['CHARSET_ALPHA'], custom: ['123'] })
    ).toStrictEqual({
      builtIn: ['CHARSET_ALPHA'],
      custom: ['123']
    });
  });

  test('Should be able to return characterSetOption that is valid and has only builtIn field', () => {
    expect(validateCharacterSetOption({ builtIn: ['CHARSET_ALPHA'] })).toStrictEqual({
      builtIn: ['CHARSET_ALPHA']
    });
  });

  test('Should be able to return characterSetOption that is valid and has empty object', () => {
    expect(validateCharacterSetOption({})).toStrictEqual({});
  });
});
