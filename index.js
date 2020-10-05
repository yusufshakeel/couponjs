'use strict';

const Engine = require('./app/engine.js');
const { defaultCouponGenerationOption, defaultCouponEngineOption } = require('./app/option.js');
const randomInteger = require('./app/random-integer.js');
const Performance = require('./app/performance.js');
const { couponConfigValidator } = require('./app/validator/coupon-config-validator.js');

/**
 * The Coupon constructor.
 * @param {object} config This is to configure the coupon engine.
 * @constructor
 */
const Coupon = function (config) {
  const performance = new Performance();
  const { verbose, logPerformance } = Object.assign({}, defaultCouponEngineOption, config);
  couponConfigValidator({ verbose, logPerformance });

  /**
   * This will generate coupons.
   *
   * @param {object} option This is the configuration option.
   * @returns {string}
   */
  this.generate = function (option) {
    performance.startTimer();
    const {
      numberOfCoupons,
      length,
      prefix,
      suffix,
      omitCharacters,
      format,
      characterSet: characterSetOption
    } = Object.assign({}, defaultCouponGenerationOption, option);
    try {
      const engine = new Engine({
        randomInteger,
        characterSetOption,
        length,
        prefix,
        suffix,
        numberOfCoupons,
        omitCharacters,
        format
      });
      const generatedCoupons = engine.run();
      performance.stopTimer();
      const performanceStats = logPerformance ? { performance: performance.stats() } : {};
      const verboseResult = {
        ...performanceStats,
        numberOfCoupons,
        status: 'success',
        coupons: numberOfCoupons === 1 ? [generatedCoupons] : generatedCoupons
      };
      return verbose ? verboseResult : generatedCoupons;
    } catch (e) {
      performance.stopTimer();
      const performanceStats = logPerformance ? { performance: performance.stats() } : {};
      if (verbose) {
        return {
          status: 'error',
          error: {
            message: e.message,
            type: e.type,
            errors: e.errors
          },
          ...performanceStats
        };
      } else {
        throw e;
      }
    }
  };
};

module.exports = Coupon;
