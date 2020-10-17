'use strict';

const {
  validateLength,
  validateOmitCharacters,
  validateNumberOfCoupons,
  validatePrefix,
  validateSuffix
} = require('./validator/generate-coupon-config-validator.js');

const {
  DEFAULT_LENGTH,
  DEFAULT_PREFIX,
  DEFAULT_SUFFIX,
  MAX_NUMBER_OF_COUPONS_TO_GENERATE,
  DEFAULT_NUMBER_OF_COUPONS_TO_GENERATE,
  DEFAULT_OMIT_CHARACTERS,
  DEFAULT_CHARACTER_SET_OPTION,
  UNDEFINED
} = require('./constants.js');
const Formatter = require('./formatter.js');
const characterSetBuilder = require('./character-set-builder.js');

/**
 * Engine to produce coupon.
 * @param {function} randomInteger This is the function that will generate random integer value.
 * @param {object} characterSetOption This is the set of character set options used to generate coupon.
 * @param {number} length This is the length of the coupon excluding prefix and suffix characters if any.
 * @param {string} prefix This is the set of characters that is added at the start of the coupon.
 * @param {string} suffix This is the set of characters that is added at the end of the coupon.
 * @param {number} numberOfCoupons Total number of coupons to generate.
 * @param {string[]} omitCharacters This is the array of characters that will be ignored.
 * @param {string|object} format This is the format rule that will be applied to the coupon.
 * @param {number} maxNumberOfCouponsToGenerate This is the maximum number of coupons that can be generated.
 * @constructor
 */
const Engine = function ({
  randomInteger,
  characterSetOption = DEFAULT_CHARACTER_SET_OPTION,
  length = DEFAULT_LENGTH,
  prefix = DEFAULT_PREFIX,
  suffix = DEFAULT_SUFFIX,
  numberOfCoupons = DEFAULT_NUMBER_OF_COUPONS_TO_GENERATE,
  omitCharacters = DEFAULT_OMIT_CHARACTERS,
  format = UNDEFINED,
  maxNumberOfCouponsToGenerate = MAX_NUMBER_OF_COUPONS_TO_GENERATE
}) {
  validatePrefix(prefix);
  validateSuffix(suffix);
  validateLength(length);
  validateOmitCharacters(omitCharacters);

  const formatter = format !== UNDEFINED ? new Formatter(format) : { format: coupon => coupon };

  const characters = characterSetBuilder(characterSetOption, omitCharacters).split('');
  const charactersLength = characters.length;
  const totalNumberOfPossibleCoupons = Math.pow(charactersLength, length);

  validateNumberOfCoupons(
    numberOfCoupons,
    maxNumberOfCouponsToGenerate,
    totalNumberOfPossibleCoupons
  );

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
    if (numberOfCoupons === 1) {
      return generateSingleCoupon();
    }
    return generateMultipleCoupons();
  };
};

module.exports = Engine;
