const {MAX_LENGTH, MIN_LENGTH, DEFAULT_LENGTH, DEFAULT_PREFIX, DEFAULT_SUFFIX} = require('./constants.js');
const characterSetBuilder = require('./character-set-builder.js');

/**
 * Engine to produce coupon.
 * @param {object} characterSetOption This is the set of character set options used to generate coupon.
 * @param {function} randomInteger This is the function that will generate random integer value.
 * @param {number} length This is the length of the coupon excluding prefix and suffix characters if any.
 * @param {string} prefix This is the set of characters that is added at the start of the coupon.
 * @param {string} suffix This is the set of characters that is added at the end of the coupon.
 * @constructor
 */
const Engine = function (characterSetOption, randomInteger, length = DEFAULT_LENGTH, prefix = DEFAULT_PREFIX, suffix = DEFAULT_SUFFIX) {

  /**
   * This will validate options
   * @param length
   */
  const validate = function ({length}) {
    if (length <= MIN_LENGTH) throw new Error(`Minimum value for "length" is ${MIN_LENGTH}.`);
    if (length >= MAX_LENGTH) throw new Error(`Maximum value for "length" is ${MAX_LENGTH}.`);
  };

  /**
   * This will generate the coupon.
   * @returns {string}
   */
  function generateCoupon() {
    const characters = characterSetBuilder(characterSetOption).split('');
    const charactersLength = characters.length;
    const generatedCouponCharacters = [];
    for (let i = 0; i < length; i++) {
      generatedCouponCharacters.push(
        characters[randomInteger(0, charactersLength - 1)]
      );
    }
    return `${prefix}${generatedCouponCharacters.join('')}${suffix}`;
  }

  /**
   * This will return coupon.
   * @returns {string}
   */
  this.run = function () {
    validate({length});
    return generateCoupon();
  };
};

module.exports = Engine;