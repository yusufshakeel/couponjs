const Engine = require('./app/engine.js');
const { ALPHABET_UPPERCASE } = require('./app/constants.js');
const randomInteger = require('./app/random-integer.js');

/**
 * The Coupon constructor.
 * @constructor
 */
const Coupon = function () {
  /**
   * This will generate coupons.
   * @returns {string}
   */
  this.generate = function () {
    const engine = new Engine(ALPHABET_UPPERCASE, randomInteger);
    return engine.run();
  };
};

module.exports = Coupon;
