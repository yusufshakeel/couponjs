'use strict';

const { ERROR_CONSTANTS } = require('../constants.js');
const ValidationError = require('../error/validation-error.js');
const { isOfType, isUndefined, isInteger } = require('../validator/validator.js');

function couponConfigValidator(config) {
  const { verbose, logPerformance, maxNumberOfCouponsToGenerate } = config;

  if (!isUndefined(verbose) && !isOfType(verbose, 'boolean')) {
    throw new ValidationError({
      message: `Coupon engine configuration field 'verbose' must be of type boolean.`,
      errors: [
        {
          type: ERROR_CONSTANTS.COUPONJS_COUPON_ENGINE_CONFIGURATION_ERROR.type,
          field: 'verbose',
          message: `Coupon engine configuration field 'verbose' must be of type boolean.`
        }
      ]
    });
  }

  if (!isUndefined(logPerformance) && !isOfType(logPerformance, 'boolean')) {
    throw new ValidationError({
      message: `Coupon engine configuration field 'logPerformance' must be of type boolean.`,
      errors: [
        {
          type: ERROR_CONSTANTS.COUPONJS_COUPON_ENGINE_CONFIGURATION_ERROR.type,
          field: 'logPerformance',
          message: `Coupon engine configuration field 'logPerformance' must be of type boolean.`
        }
      ]
    });
  }

  if (!isUndefined(maxNumberOfCouponsToGenerate) && !isInteger(maxNumberOfCouponsToGenerate)) {
    throw new ValidationError({
      message: `Coupon engine configuration field 'maxNumberOfCouponsToGenerate' must be of type integer.`,
      errors: [
        {
          type: ERROR_CONSTANTS.COUPONJS_COUPON_ENGINE_CONFIGURATION_ERROR.type,
          field: 'maxNumberOfCouponsToGenerate',
          message: `Coupon engine configuration field 'maxNumberOfCouponsToGenerate' must be of type integer.`
        }
      ]
    });
  }

  if (maxNumberOfCouponsToGenerate < 1) {
    throw new ValidationError({
      message: `Coupon engine configuration field 'maxNumberOfCouponsToGenerate' must be greater than 0.`,
      errors: [
        {
          type: ERROR_CONSTANTS.COUPONJS_COUPON_ENGINE_CONFIGURATION_ERROR.type,
          field: 'maxNumberOfCouponsToGenerate',
          message: `Coupon engine configuration field 'maxNumberOfCouponsToGenerate' must be greater than 0.`
        }
      ]
    });
  }
}

module.exports = { couponConfigValidator };
