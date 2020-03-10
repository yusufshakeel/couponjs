const Engine = require('./app/engine.js');
const defaultOptions = require('./app/option.js');
const randomInteger = require('./app/random-integer.js');

/**
 * The Coupon constructor.
 * @constructor
 */
const Coupon = function () {
  /**
   * This will generate coupons.
   *
   * @param {object} option This is the configuration option.
   * @returns {string}
   */
  this.generate = function (option) {
    const { length, characters } = Object.assign(defaultOptions, option);
    const engine = new Engine(characters, randomInteger, length);
    return engine.run();
  };
};

module.exports = Coupon;
