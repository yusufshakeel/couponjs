'use strict';

const {
  DEFAULT_LENGTH,
  DEFAULT_PREFIX,
  DEFAULT_SUFFIX,
  DEFAULT_NUMBER_OF_COUPONS_TO_GENERATE,
  DEFAULT_OMIT_CHARACTERS,
  DEFAULT_COUPON_FORMAT,
  MAX_NUMBER_OF_COUPONS_TO_GENERATE,
  DEFAULT_CUSTOM_CHARACTER_SET,
  DEFAULT_BUILTIN_CHARACTER_SET
} = require('./constants.js');

module.exports = {
  defaultCouponEngineOption: {
    verbose: false,
    logPerformance: false,
    maxNumberOfCouponsToGenerate: MAX_NUMBER_OF_COUPONS_TO_GENERATE
  },
  defaultCouponGenerationOption: {
    length: DEFAULT_LENGTH,
    prefix: DEFAULT_PREFIX,
    suffix: DEFAULT_SUFFIX,
    characterSet: {
      builtIn: DEFAULT_BUILTIN_CHARACTER_SET,
      custom: DEFAULT_CUSTOM_CHARACTER_SET
    },
    numberOfCoupons: DEFAULT_NUMBER_OF_COUPONS_TO_GENERATE,
    omitCharacters: DEFAULT_OMIT_CHARACTERS,
    format: DEFAULT_COUPON_FORMAT
  }
};
