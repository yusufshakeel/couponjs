'use strict';

const {
  MAX_LENGTH,
  MIN_LENGTH,
  MIN_NUMBER_OF_COUPONS_TO_GENERATE,
  MAX_NUMBER_OF_COUPONS_TO_GENERATE,
  ERROR_CONSTANTS
} = require('../constants.js');
const ValidationError = require('../error/validation-error.js');
const isOfType = (variable, type) => typeof variable === type;

const throwValidationError = ({ message, field }) => {
  throw new ValidationError({
    message,
    errors: [
      {
        message,
        field,
        type: ERROR_CONSTANTS.COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR.type
      }
    ]
  });
};

function validateLength(length) {
  if (!isOfType(length, 'undefined')) {
    if (!Number.isInteger(length)) {
      throwValidationError({
        message: `The field 'length' must be of type integer.`,
        field: 'length'
      });
    }
    if (length < MIN_LENGTH) {
      throwValidationError({
        message: `Minimum value for 'length' is ${MIN_LENGTH}.`,
        field: 'length'
      });
    }
    if (length > MAX_LENGTH) {
      throwValidationError({
        message: `Maximum value for length is ${MAX_LENGTH}.`,
        field: 'length'
      });
    }
    return length;
  }

  throwValidationError({
    message: `The field 'length' number be defined.`,
    field: 'length'
  });
}

function validateNumberOfCoupons(numberOfCoupons, maxNumberOfCouponsToGenerate) {
  if (!isOfType(numberOfCoupons, 'undefined')) {
    if (!Number.isInteger(numberOfCoupons)) {
      throwValidationError({
        message: `The field 'numberOfCoupons' must be of type integer.`,
        field: 'numberOfCoupons'
      });
    }
    if (numberOfCoupons < MIN_NUMBER_OF_COUPONS_TO_GENERATE) {
      throwValidationError({
        message: `Minimum value for numberOfCoupons is ${MIN_NUMBER_OF_COUPONS_TO_GENERATE}.`,
        field: 'numberOfCoupons'
      });
    }
    if (numberOfCoupons > maxNumberOfCouponsToGenerate) {
      throwValidationError({
        message: `Maximum value for numberOfCoupons is ${maxNumberOfCouponsToGenerate}.`,
        field: 'numberOfCoupons'
      });
    }
    return numberOfCoupons;
  }

  throwValidationError({
    message: `The field 'numberOfCoupons' number be defined.`,
    field: 'numberOfCoupons'
  });
}

function validateOmitCharacters(omitCharacters) {
  if (!isOfType(omitCharacters, 'undefined')) {
    if (!Array.isArray(omitCharacters)) {
      throwValidationError({
        message: `The field 'omitCharacters' must be of type array.`,
        field: 'omitCharacters'
      });
    }

    const errors = omitCharacters.reduce((error, omitCharacter, index) => {
      if (isOfType(omitCharacter, 'string')) {
        return error;
      }
      return [
        ...error,
        {
          field: 'omitCharacters',
          message: `The field 'omitCharacters' must be an array of string. Non-string value found at index ${index}.`,
          type: ERROR_CONSTANTS.COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR.type
        }
      ];
    }, []);
    if (errors.length > 0) {
      throw new ValidationError({
        errors,
        message: `The field 'omitCharacters' must be an array of strings.`
      });
    }
    return omitCharacters;
  }

  throwValidationError({
    message: `The field 'omitCharacters' number be defined.`,
    field: 'omitCharacters'
  });
}

function generateCouponConfigValidator(config) {
  const {
    length,
    numberOfCoupons,
    omitCharacters,
    maxNumberOfCouponsToGenerate = MAX_NUMBER_OF_COUPONS_TO_GENERATE
  } = config;

  validateLength(length);
  validateNumberOfCoupons(numberOfCoupons, maxNumberOfCouponsToGenerate);
  validateOmitCharacters(omitCharacters);
}

module.exports = { generateCouponConfigValidator };
