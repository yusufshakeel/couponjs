'use strict';

const {
  MAX_LENGTH,
  MIN_LENGTH,
  MIN_NUMBER_OF_COUPONS_TO_GENERATE,
  ERROR_CONSTANTS
} = require('../constants.js');
const ValidationError = require('../error/validation-error.js');
const {
  isArray,
  isUndefined,
  isInteger,
  isString,
  isObject,
  isEmptyArray
} = require('../validator/validator.js');

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

/**
 * This will validate length of the coupon.
 * @param {number} length
 * @returns {*}
 */
function validateLength(length) {
  if (!isUndefined(length)) {
    if (!isInteger(length)) {
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
    message: `The field 'length' must be defined.`,
    field: 'length'
  });
}

/**
 * This will validate the number of coupons.
 * @param {number} numberOfCoupons
 * @param {number} maxNumberOfCouponsToGenerate
 * @param {number} totalNumberOfPossibleCoupons
 * @returns {*}
 */
function validateNumberOfCoupons(
  numberOfCoupons,
  maxNumberOfCouponsToGenerate,
  totalNumberOfPossibleCoupons
) {
  if (!isUndefined(numberOfCoupons)) {
    if (!isInteger(numberOfCoupons)) {
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
    if (numberOfCoupons > totalNumberOfPossibleCoupons) {
      throwValidationError({
        message: `Total number of possible coupons that can be generated is ${totalNumberOfPossibleCoupons} for the given length and characterSet.`,
        field: 'numberOfCoupons'
      });
    }
    return numberOfCoupons;
  }

  throwValidationError({
    message: `The field 'numberOfCoupons' must be defined.`,
    field: 'numberOfCoupons'
  });
}

/**
 * This will validate the characters to omit.
 * @param {string[]} omitCharacters
 * @returns {*}
 */
function validateOmitCharacters(omitCharacters) {
  if (!isUndefined(omitCharacters)) {
    if (!isArray(omitCharacters)) {
      throwValidationError({
        message: `The field 'omitCharacters' must be of type array.`,
        field: 'omitCharacters'
      });
    }

    const errors = omitCharacters.reduce((error, omitCharacter, index) => {
      if (isString(omitCharacter)) {
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
    if (!isEmptyArray(errors)) {
      throw new ValidationError({
        errors,
        message: `The field 'omitCharacters' must be an array of strings.`
      });
    }
    return omitCharacters;
  }

  throwValidationError({
    message: `The field 'omitCharacters' must be defined.`,
    field: 'omitCharacters'
  });
}

/**
 * This will validate the prefix.
 * @param {string} prefix
 * @returns {*}
 */
function validatePrefix(prefix) {
  if (isUndefined(prefix)) {
    throwValidationError({
      message: `The field 'prefix' must be defined.`,
      field: 'prefix'
    });
  }

  if (!isString(prefix)) {
    throwValidationError({
      message: `The field 'prefix' must be of type string.`,
      field: 'prefix'
    });
  }

  return prefix;
}

/**
 * This will validate the suffix.
 * @param {string} suffix
 * @returns {*}
 */
function validateSuffix(suffix) {
  if (isUndefined(suffix)) {
    throwValidationError({
      message: `The field 'suffix' must be defined.`,
      field: 'suffix'
    });
  }

  if (!isString(suffix)) {
    throwValidationError({
      message: `The field 'suffix' must be of type string.`,
      field: 'suffix'
    });
  }

  return suffix;
}

/**
 * This will validate the character set option.
 * @param {{builtIn: string[], custom: string[]}} characterSetOption
 * @returns {*}
 */
function validateCharacterSetOption(characterSetOption) {
  if (isUndefined(characterSetOption)) {
    throwValidationError({
      message: `The field 'characterSet' must be defined.`,
      field: 'characterSet'
    });
  }

  if (!isObject(characterSetOption)) {
    throwValidationError({
      message: `The field 'characterSet' must be of type object.`,
      field: 'characterSet'
    });
  }

  const { builtIn, custom } = characterSetOption;

  if (isUndefined(builtIn)) {
    throwValidationError({
      message: `The field 'characterSet.builtIn' must be defined.`,
      field: 'characterSet.builtIn'
    });
  }
  if (!isArray(builtIn)) {
    throwValidationError({
      message: `The field 'characterSet.builtIn' must be an array.`,
      field: 'characterSet.builtIn'
    });
  }
  const builtInErrors = builtIn.reduce((error, charSet, index) => {
    if (isString(charSet)) {
      return error;
    }
    return [
      ...error,
      {
        field: 'characterSet.builtIn',
        message: `The field 'characterSet.builtIn' must be an array of string. Non-string value found at index ${index}.`,
        type: ERROR_CONSTANTS.COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR.type
      }
    ];
  }, []);
  if (!isEmptyArray(builtInErrors)) {
    throw new ValidationError({
      errors: builtInErrors,
      message: `The field 'characterSet.builtIn' must be an array of strings.`
    });
  }

  if (isUndefined(custom)) {
    throwValidationError({
      message: `The field 'characterSet.custom' must be defined.`,
      field: 'characterSet.custom'
    });
  }
  if (!isArray(custom)) {
    throwValidationError({
      message: `The field 'characterSet.custom' must be an array.`,
      field: 'characterSet.custom'
    });
  }
  const customErrors = custom.reduce((error, charSet, index) => {
    if (isString(charSet)) {
      return error;
    }
    return [
      ...error,
      {
        field: 'characterSet.custom',
        message: `The field 'characterSet.custom' must be an array of string. Non-string value found at index ${index}.`,
        type: ERROR_CONSTANTS.COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR.type
      }
    ];
  }, []);
  if (!isEmptyArray(customErrors)) {
    throw new ValidationError({
      errors: customErrors,
      message: `The field 'characterSet.custom' must be an array of strings.`
    });
  }

  return characterSetOption;
}

module.exports = {
  validateLength,
  validateNumberOfCoupons,
  validateOmitCharacters,
  validatePrefix,
  validateSuffix,
  validateCharacterSetOption
};
