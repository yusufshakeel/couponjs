import couponConfigValidator from '../../../src/validators/coupon-config-validator';

describe('Testing coupon config validator', () => {
  test('Should throw error if verbose is not of type boolean', () => {
    expect.assertions(3);
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      couponConfigValidator({ verbose: 123 });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(e.message).toBe("Coupon engine configuration field 'verbose' must be of type boolean.");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(e.errors).toStrictEqual([
        {
          field: 'verbose',
          message: "Coupon engine configuration field 'verbose' must be of type boolean.",
          type: 'COUPONJS_COUPON_ENGINE_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if logPerformance is not of type boolean', () => {
    expect.assertions(3);
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      couponConfigValidator({ logPerformance: 123 });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(e.message).toBe(
        "Coupon engine configuration field 'logPerformance' must be of type boolean."
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(e.errors).toStrictEqual([
        {
          field: 'logPerformance',
          message: "Coupon engine configuration field 'logPerformance' must be of type boolean.",
          type: 'COUPONJS_COUPON_ENGINE_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if maxNumberOfCouponsToGenerate is not of type integer', () => {
    expect.assertions(3);
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      couponConfigValidator({ maxNumberOfCouponsToGenerate: 'hello' });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(e.message).toBe(
        "Coupon engine configuration field 'maxNumberOfCouponsToGenerate' must be of type integer."
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(e.errors).toStrictEqual([
        {
          field: 'maxNumberOfCouponsToGenerate',
          message:
            "Coupon engine configuration field 'maxNumberOfCouponsToGenerate' must be of type integer.",
          type: 'COUPONJS_COUPON_ENGINE_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if maxNumberOfCouponsToGenerate is not greater than 0', () => {
    expect.assertions(3);
    try {
      couponConfigValidator({ maxNumberOfCouponsToGenerate: 0 });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(e.message).toBe(
        "Coupon engine configuration field 'maxNumberOfCouponsToGenerate' must be greater than 0."
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(e.errors).toStrictEqual([
        {
          field: 'maxNumberOfCouponsToGenerate',
          message:
            "Coupon engine configuration field 'maxNumberOfCouponsToGenerate' must be greater than 0.",
          type: 'COUPONJS_COUPON_ENGINE_CONFIGURATION_ERROR'
        }
      ]);
    }
  });
});