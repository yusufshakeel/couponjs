'use strict';

const {
  sumOf,
  attachSuffix,
  attachPrefix,
  pipe,
  identity,
  omit,
  uniqueChars
} = require('../../../../app/functional');

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

test('Should be able to attach prefix and suffix in that order using pipe function', () => {
  expect(pipe([attachPrefix('HELLO'), attachSuffix('WORLD')])('COUPON')).toBe('HELLOCOUPONWORLD');
});

test('Should be able to return the first argument it receives using identity function', () => {
  expect(identity('foo')).toBe('foo');
  expect(identity(1)).toBe(1);
  expect(identity(null)).toBe(null);
  expect(identity(undefined)).toBe(undefined);
  expect(identity({ foo: 'bar' })).toStrictEqual({ foo: 'bar' });
  expect(identity(true)).toBeTruthy();
  expect(identity(false)).toBeFalsy();
});

test('Should be able to omit values', () => {
  const values = ['A', 'B', 'C', 'D', 'E', 'F'];
  const valuesToOmit = ['A', 'B', 'F'];
  expect(omit(values, valuesToOmit)).toStrictEqual(['C', 'D', 'E']);
});

test('Should be able to get unique characters', () => {
  expect(uniqueChars(['ABC', 'CD', 'EB', 'ACF'])).toStrictEqual(['A', 'B', 'C', 'D', 'E', 'F']);
});
