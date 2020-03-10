const Coupon = require('../index.js');

test('Should generate coupon code using uppercase alphabet A-Z of length 6.', () => {
  const coupon = new Coupon();
  const result = coupon.generate();
  expect(/^[A-Z]{6}$/.test(result)).toBeTruthy();
});

test('Should generate coupon code using uppercase alphabet A-Z of length 8.', () => {
  const coupon = new Coupon();
  const result = coupon.generate({ length: 8 });
  expect(/^[A-Z]{8}$/.test(result)).toBeTruthy();
});
