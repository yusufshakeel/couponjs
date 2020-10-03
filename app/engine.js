'use strict';

const { ERROR_CONSTANTS } = require('./constants.js');
const ValidationError = require('./error/validation-error.js');

const {
  MAX_LENGTH,
  MIN_LENGTH,
  DEFAULT_LENGTH,
  DEFAULT_PREFIX,
  DEFAULT_SUFFIX,
  MIN_NUMBER_OF_COUPONS_TO_GENERATE,
  MAX_NUMBER_OF_COUPONS_TO_GENERATE,
  DEFAULT_NUMBER_OF_COUPONS_TO_GENERATE,
  DEFAULT_OMIT_CHARACTERS,
  UNDEFINED
} = require('./constants.js');
const Formatter = require('./formatter.js');
const characterSetBuilder = require('./character-set-builder.js');

const throwValidationError = ({ message, field }) => {
  throw new ValidationError({
    message,
    errors: [
      {
        message,
        field,
        type: ERROR_CONSTANTS.COUPONJS_CONFIGURATION_ERROR.type
      }
    ]
  });
};

/**
 * Engine to produce coupon.
 * @param {object} characterSetOption This is the set of character set options used to generate coupon.
 * @param {function} randomInteger This is the function that will generate random integer value.
 * @param {number} length This is the length of the coupon excluding prefix and suffix characters if any.
 * @param {string} prefix This is the set of characters that is added at the start of the coupon.
 * @param {string} suffix This is the set of characters that is added at the end of the coupon.
 * @param {number} numberOfCoupons Total number of coupons to generate.
 * @param {string[]} omitCharacters This is the array of characters that will be ignored.
 * @param {string|object} format This is the format rule that will be applied to the coupon.
 * @constructor
 */
const Engine = function (
  characterSetOption,
  randomInteger,
  length = DEFAULT_LENGTH,
  prefix = DEFAULT_PREFIX,
  suffix = DEFAULT_SUFFIX,
  numberOfCoupons = DEFAULT_NUMBER_OF_COUPONS_TO_GENERATE,
  omitCharacters = DEFAULT_OMIT_CHARACTERS,
  format = UNDEFINED
) {
  const formatter = format !== UNDEFINED ? new Formatter(format) : { format: coupon => coupon };

  const characters = characterSetBuilder(characterSetOption, omitCharacters).split('');
  const charactersLength = characters.length;
  const totalNumberOfPossibleCoupons = Math.pow(charactersLength, length);

  /**
   * This will validate options
   * @param {number} length
   * @param {number} numberOfCoupons
   */
  const validate = function ({ length, numberOfCoupons }) {
    if (numberOfCoupons < MIN_NUMBER_OF_COUPONS_TO_GENERATE) {
      throwValidationError({
        message: `Minimum value for numberOfCoupons is ${MIN_NUMBER_OF_COUPONS_TO_GENERATE}.`,
        field: 'numberOfCoupons'
      });
    }
    if (numberOfCoupons > MAX_NUMBER_OF_COUPONS_TO_GENERATE) {
      throwValidationError({
        message: `Maximum value for numberOfCoupons is ${MAX_NUMBER_OF_COUPONS_TO_GENERATE}.`,
        field: 'numberOfCoupons'
      });
    }
    if (numberOfCoupons > totalNumberOfPossibleCoupons) {
      throwValidationError({
        message: `Total number of possible coupons that can be generated is ${totalNumberOfPossibleCoupons}.`,
        field: 'numberOfCoupons'
      });
    }
    if (length < MIN_LENGTH) {
      throwValidationError({
        message: `Minimum value for length is ${MIN_LENGTH}.`,
        field: 'length'
      });
    }
    if (length > MAX_LENGTH) {
      throwValidationError({
        message: `Maximum value for length is ${MAX_LENGTH}.`,
        field: 'length'
      });
    }
  };

  /**
   * This will generate the coupon.
   * @returns {string}
   */
  function generateCoupon() {
    const generatedCouponCharacters = [];
    for (let i = 0; i < length; i++) {
      generatedCouponCharacters.push(characters[randomInteger(0, charactersLength - 1)]);
    }
    const coupon = `${prefix}${generatedCouponCharacters.join('')}${suffix}`;
    return formatter.format(coupon);
  }

  /**
   * This will generate single coupon.
   * @returns {string}
   */
  function generateSingleCoupon() {
    return generateCoupon();
  }

  /**
   * This will generate multiple coupons.
   * @returns {string[]}
   */
  function generateMultipleCoupons() {
    const couponSet = new Set();
    while (couponSet.size < numberOfCoupons) {
      couponSet.add(generateCoupon());
    }
    return [...couponSet];
  }

  /**
   * This will return coupon.
   * @returns {string|string[]}
   */
  this.run = function () {
    validate({ length, numberOfCoupons });
    if (numberOfCoupons === 1) {
      return generateSingleCoupon();
    }
    return generateMultipleCoupons();
  };
};

module.exports = Engine;
