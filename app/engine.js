'use strict';

const {
  MAX_LENGTH,
  MIN_LENGTH,
  DEFAULT_LENGTH,
  DEFAULT_PREFIX,
  DEFAULT_SUFFIX,
  MIN_NUMBER_OF_COUPONS_TO_GENERATE,
  MAX_NUMBER_OF_COUPONS_TO_GENERATE,
  DEFAULT_NUMBER_OF_COUPONS_TO_GENERATE,
  DEFAULT_OMIT_CHARACTERS
} = require('./constants.js');
const characterSetBuilder = require('./character-set-builder.js');

/**
 * Engine to produce coupon.
 * @param {object} characterSetOption This is the set of character set options used to generate coupon.
 * @param {function} randomInteger This is the function that will generate random integer value.
 * @param {number} length This is the length of the coupon excluding prefix and suffix characters if any.
 * @param {string} prefix This is the set of characters that is added at the start of the coupon.
 * @param {string} suffix This is the set of characters that is added at the end of the coupon.
 * @param {number} numberOfCoupons Total number of coupons to generate.
 * @param {string[]} omitCharacters This is the array of characters that will be ignored.
 * @constructor
 */
const Engine = function (
  characterSetOption,
  randomInteger,
  length = DEFAULT_LENGTH,
  prefix = DEFAULT_PREFIX,
  suffix = DEFAULT_SUFFIX,
  numberOfCoupons = DEFAULT_NUMBER_OF_COUPONS_TO_GENERATE,
  omitCharacters = DEFAULT_OMIT_CHARACTERS
) {
  const characters = characterSetBuilder(characterSetOption, omitCharacters).split('');
  const charactersLength = characters.length;
  const totalNumberOfPossibleCoupons = Math.pow(charactersLength, length);

  /**
   * This will validate options
   * @param {number} length
   * @param {number} numberOfCoupons
   */
  const validate = function ({ length, numberOfCoupons }) {
    if (numberOfCoupons < MIN_NUMBER_OF_COUPONS_TO_GENERATE)
      throw new Error(`Minimum value for numberOfCoupons is ${MIN_NUMBER_OF_COUPONS_TO_GENERATE}.`);
    if (numberOfCoupons > MAX_NUMBER_OF_COUPONS_TO_GENERATE)
      throw new Error(`Maximum value for numberOfCoupons is ${MAX_NUMBER_OF_COUPONS_TO_GENERATE}.`);
    if (numberOfCoupons > totalNumberOfPossibleCoupons)
      throw new Error(
        `Total number of possible coupons that can be generated is ${totalNumberOfPossibleCoupons}.`
      );
    if (length < MIN_LENGTH) throw new Error(`Minimum value for length is ${MIN_LENGTH}.`);
    if (length > MAX_LENGTH) throw new Error(`Maximum value for length is ${MAX_LENGTH}.`);
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
    return `${prefix}${generatedCouponCharacters.join('')}${suffix}`;
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
   * @returns {string}
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
