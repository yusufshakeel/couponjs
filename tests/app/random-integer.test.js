const randomInteger = require('../../app/random-integer.js');

test('Should return 0 when min and max is set to 0', () => {
  expect(randomInteger(0, 0)).toBe(0);
});

test('Should return 1 when min and max is set to 1', () => {
  expect(randomInteger(1, 1)).toBe(1);
});