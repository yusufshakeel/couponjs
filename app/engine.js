/**
 * Engine to produce coupon.
 * @param {string} characters This is the set of characters used to generate coupon.
 * @param {function} randomInteger This is the function that will generate random integer value.
 * @constructor
 */
const Engine = function (characters, randomInteger) {

  function characterSet() {
    return characters.split('');
  }

  function generateCoupon() {
    const generatedCouponCharacters = [];
    const charSet = characterSet();
    for(let i = 0; i < 6; i++) {
      generatedCouponCharacters.push(
        charSet[randomInteger(0, 6)]
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