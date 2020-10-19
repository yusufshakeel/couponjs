'use strict';

const { sumOf, attachSuffix, attachPrefix, pipe } = require('../../../../app/functional');

test('Should be able to sum up', () => {
  expect(sumOf([1, 2, 3])).toBe(6);
});

test('Should be able to attach prefix', () => {
  expect(attachPrefix('HELLO')('COUPON')).toBe('HELLOCOUPON');
  expect(attachPrefix()('COUPON')).toBe('COUPON');
});

test('Should be able to attach suffix', () => {
  expect(attachSuffix('WORLD')('COUPON')).toBe('COUPONWORLD');
  expect(attachSuffix()('COUPON')).toBe('COUPON');
});

test('Should be able to attach prefix and suffix in that order using pipe', () => {
  expect(pipe([attachPrefix('HELLO'), attachSuffix('WORLD')])('COUPON')).toBe('HELLOCOUPONWORLD');
});
