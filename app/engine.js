const { DEFAULT_LENGTH } = require('./constants.js');
/**
 * Engine to produce coupon.
 * @param {string} characters This is the set of characters used to generate coupon.
 * @param {function} randomInteger This is the function that will generate random integer value.
 * @param {number} length This is the length of the coupon.
 * @constructor
 */
const Engine = function (characters, randomInteger, length = DEFAULT_LENGTH) {

  function characterSet() {
    return characters.split('');
  }

  function generateCoupon() {
    const generatedCouponCharacters = [];
    const charSet = characterSet();
    for(let i = 0; i < length; i++) {
      generatedCouponCharacters.push(
        charSet[randomInteger(0, length - 1)]
      );
    }
    return generatedCouponCharacters.join('');
  }

  /**
   * This will return coupon.
   * @returns {string}
   */
  this.run = function () {
    return generateCoupon();
  }
};

module.exports = Engine;