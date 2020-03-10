const Coupon = require('../index.js');

test('Should generate coupon code using uppercase alphabet A-Z of length 6.', () => {
  const coupon = new Coupon();
  const result = coupon.generate();
  expect(/^[A-Z]{6}$/.test(result)).toBeTruthy();
});

test('Should generate coupon code using uppercase alphabet A-Z of length 8.', () => {
  const coupon = new Coupon();
  const result = coupon.generate({length: 8});
  expect(/^[A-Z]{8}$/.test(result)).toBeTruthy();
});

test('Should generate coupon code using uppercase alphabet A-Z of length 6,7,8,9,10.', () => {
  const coupon = new Coupon();
  expect(/^[A-Z]{6}$/.test(coupon.generate({length: 6}))).toBeTruthy();
  expect(/^[A-Z]{7}$/.test(coupon.generate({length: 7}))).toBeTruthy();
  expect(/^[A-Z]{8}$/.test(coupon.generate({length: 8}))).toBeTruthy();
  expect(/^[A-Z]{9}$/.test(coupon.generate({length: 9}))).toBeTruthy();
  expect(/^[A-Z]{10}$/.test(coupon.generate({length: 10}))).toBeTruthy();
});

test('Should generate coupon code using uppercase alphabet A-Z of length 6 including prefix "SUPER"', () => {
  const coupon = new Coupon();
  const result = coupon.generate({length: 6, prefix: 'SUPER'});
  expect(/^SUPER[A-Z]{6}$/.test(result)).toBeTruthy();
});

test('Should generate coupon code using uppercase alphabet A-Z of length 6 including prefix "SUPER" and suffix "AWESOME"', () => {
  const coupon = new Coupon();
  const result = coupon.generate({length: 6, prefix: 'SUPER', suffix: 'AWESOME'});
  expect(/^SUPER[A-Z]{6}AWESOME$/.test(result)).toBeTruthy();
});

test('Should generate coupon code using uppercase alphabet A-Z of length 6 including suffix "AWESOME"', () => {
  const coupon = new Coupon();
  const result = coupon.generate({length: 6, suffix: 'AWESOME'});
  expect(/^[A-Z]{6}AWESOME$/.test(result)).toBeTruthy();
});

test('Should generate coupon code using uppercase alphabet A-Z of length 6,7,8,9,10 including prefix "SUPER"', () => {
  const coupon = new Coupon();
  expect(/^SUPER[A-Z]{6}$/.test(coupon.generate({length: 6, prefix: 'SUPER'}))).toBeTruthy();
  expect(/^SUPER[A-Z]{7}$/.test(coupon.generate({length: 7, prefix: 'SUPER'}))).toBeTruthy();
  expect(/^SUPER[A-Z]{8}$/.test(coupon.generate({length: 8, prefix: 'SUPER'}))).toBeTruthy();
  expect(/^SUPER[A-Z]{9}$/.test(coupon.generate({length: 9, prefix: 'SUPER'}))).toBeTruthy();
  expect(/^SUPER[A-Z]{10}$/.test(coupon.generate({length: 10, prefix: 'SUPER'}))).toBeTruthy();
});

test('Should generate coupon code using uppercase alphabet A-Z of length 6,7,8,9,10 including prefix "SUPER" and suffix "AWESOME"', () => {
  const coupon = new Coupon();
  expect(/^SUPER[A-Z]{6}AWESOME$/.test(coupon.generate({length: 6, prefix: 'SUPER', suffix: 'AWESOME'}))).toBeTruthy();
  expect(/^SUPER[A-Z]{7}AWESOME$/.test(coupon.generate({length: 7, prefix: 'SUPER', suffix: 'AWESOME'}))).toBeTruthy();
  expect(/^SUPER[A-Z]{8}AWESOME$/.test(coupon.generate({length: 8, prefix: 'SUPER', suffix: 'AWESOME'}))).toBeTruthy();
  expect(/^SUPER[A-Z]{9}AWESOME$/.test(coupon.generate({length: 9, prefix: 'SUPER', suffix: 'AWESOME'}))).toBeTruthy();
  expect(/^SUPER[A-Z]{10}AWESOME$/.test(coupon.generate({
    length: 10,
    prefix: 'SUPER',
    suffix: 'AWESOME'
  }))).toBeTruthy();
});

test('Should generate coupon code using uppercase alphabet A-Z of length 6,7,8,9,10 including suffix "AWESOME"', () => {
  const coupon = new Coupon();
  expect(/^[A-Z]{6}AWESOME$/.test(coupon.generate({length: 6, suffix: 'AWESOME'}))).toBeTruthy();
  expect(/^[A-Z]{7}AWESOME$/.test(coupon.generate({length: 7, suffix: 'AWESOME'}))).toBeTruthy();
  expect(/^[A-Z]{8}AWESOME$/.test(coupon.generate({length: 8, suffix: 'AWESOME'}))).toBeTruthy();
  expect(/^[A-Z]{9}AWESOME$/.test(coupon.generate({length: 9, suffix: 'AWESOME'}))).toBeTruthy();
  expect(/^[A-Z]{10}AWESOME$/.test(coupon.generate({length: 10, suffix: 'AWESOME'}))).toBeTruthy();
});
