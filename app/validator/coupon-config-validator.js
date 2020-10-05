'use strict';

const { ERROR_CONSTANTS } = require('../constants.js');
const ValidationError = require('../error/validation-error.js');

const isOfType = (variable, type) => typeof variable === type;

function couponConfigValidator(config) {
  const { verbose, logPerformance } = config;

  if (verbose && !isOfType(verbose, 'boolean')) {
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

  if (logPerformance && !isOfType(logPerformance, 'boolean')) {
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
}

module.exports = { couponConfigValidator };
