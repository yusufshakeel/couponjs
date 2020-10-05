'use strict';

const { couponConfigValidator } = require('../../../../app/validator/coupon-config-validator.js');

test('Should throw error if verbose is not of type boolean', () => {
  expect.assertions(3);
  try {
    couponConfigValidator({ verbose: 123 });
  } catch (e) {
    expect(e.message).toBe("Coupon engine configuration field 'verbose' must be of type boolean.");
    expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
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
    couponConfigValidator({ logPerformance: 123 });
  } catch (e) {
    expect(e.message).toBe(
      "Coupon engine configuration field 'logPerformance' must be of type boolean."
    );
    expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
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
    couponConfigValidator({ maxNumberOfCouponsToGenerate: 'hello' });
  } catch (e) {
    expect(e.message).toBe(
      "Coupon engine configuration field 'maxNumberOfCouponsToGenerate' must be of type integer."
    );
    expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
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
