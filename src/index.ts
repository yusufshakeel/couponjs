import Engine from './engine';
import options from './configs/option';
import { randomInteger, shallowMerge } from './helpers';
import Performance from './helpers/performance';
import couponConfigValidator from './validators/coupon-config-validator';
import { CouponEngineOptionType, CouponGenerationOptionType } from './ts-def/option-type';
import {
  CouponResponseType,
  ErrorResponseType,
  VerboseResponseType
} from './ts-def/coupon-response-type';

const { defaultCouponGenerationOption, defaultCouponEngineOption } = options;

export class CouponJS {
  private config: CouponEngineOptionType;
  private performance: Performance;
  private maxNumberOfCouponsToGenerate: number;
  private logPerformance: boolean;
  private verbose: boolean;

  constructor(config?: CouponEngineOptionType) {
    this.config = config ?? {};
    this.performance = new Performance();

    const { verbose, logPerformance, maxNumberOfCouponsToGenerate } = shallowMerge(
      defaultCouponEngineOption,
      config
    );
    couponConfigValidator({ verbose, logPerformance, maxNumberOfCouponsToGenerate });

    this.maxNumberOfCouponsToGenerate = maxNumberOfCouponsToGenerate;
    this.logPerformance = logPerformance;
    this.verbose = verbose;
  }

  public generate(option?: CouponGenerationOptionType): any {
    this.performance.startTimer();
    const {
      numberOfCoupons,
      length,
      prefix,
      suffix,
      omitCharacters,
      format,
      characterSet: characterSetOption
    } = shallowMerge(defaultCouponGenerationOption, option);
    try {
      const engine = new Engine({
        randomInteger,
        characterSetOption,
        length,
        prefix,
        suffix,
        numberOfCoupons,
        omitCharacters,
        format,
        maxNumberOfCouponsToGenerate: this.maxNumberOfCouponsToGenerate
      });
      const generatedCoupons: CouponResponseType = engine.run();
      this.performance.stopTimer();
      const performanceStats = this.logPerformance ? { performance: this.performance.stats() } : {};
      const verboseResult: VerboseResponseType = {
        ...performanceStats,
        numberOfCoupons,
        status: 'success',
        coupons: numberOfCoupons === 1 ?
          [generatedCoupons] as string[] :
          generatedCoupons as string[]
      };
      return this.verbose ? verboseResult : generatedCoupons;
    } catch (e: any) {
      this.performance.stopTimer();
      const performanceStats = this.logPerformance ? { performance: this.performance.stats() } : {};
      if (this.verbose) {
        return ({
          status: 'error',
          error: {
            message: e.message,
            type: e.type,
            errors: e.errors
          },
          ...performanceStats
        } as ErrorResponseType);
      } else {
        throw e;
      }
    }
  }
}

export default CouponJS;