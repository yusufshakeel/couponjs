import {
  DEFAULT_LENGTH,
  DEFAULT_PREFIX,
  DEFAULT_SUFFIX,
  DEFAULT_NUMBER_OF_COUPONS_TO_GENERATE,
  DEFAULT_OMIT_CHARACTERS,
  DEFAULT_COUPON_FORMAT,
  MAX_NUMBER_OF_COUPONS_TO_GENERATE,
  DEFAULT_CHARACTER_SET_OPTION
} from '../constants';
import { OptionType } from '../ts-def/option-type';

const options: OptionType = {
  defaultCouponEngineOption: {
    verbose: false,
    logPerformance: false,
    maxNumberOfCouponsToGenerate: MAX_NUMBER_OF_COUPONS_TO_GENERATE
  },
  defaultCouponGenerationOption: {
    length: DEFAULT_LENGTH,
    prefix: DEFAULT_PREFIX,
    suffix: DEFAULT_SUFFIX,
    characterSet: DEFAULT_CHARACTER_SET_OPTION,
    numberOfCoupons: DEFAULT_NUMBER_OF_COUPONS_TO_GENERATE,
    omitCharacters: DEFAULT_OMIT_CHARACTERS,
    format: DEFAULT_COUPON_FORMAT
  }
};

export default options;