import { ERROR_CONSTANTS } from '../constants/error-constants';
import ValidationError from '../error/validation-error';
import { isUndefined, isInteger, isBoolean } from './index';

type configType = {
  verbose?: boolean,
  logPerformance?: boolean,
  maxNumberOfCouponsToGenerate?: number
};

export default function couponConfigValidator(config: configType) {
  const { verbose, logPerformance, maxNumberOfCouponsToGenerate } = config;

  if (!isUndefined(verbose) && !isBoolean(verbose)) {
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

  if (!isUndefined(logPerformance) && !isBoolean(logPerformance)) {
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

  if ((maxNumberOfCouponsToGenerate as number) < 1) {
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
