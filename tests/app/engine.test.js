const Engine = require('../../app/engine.js');

test('Should return AAAAAA as coupon when character set is "A" and randomInteger generates always 0', () => {
  const characters = "A";
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characters, mockRandomInteger);
  expect(engine.run()).toBe('AAAAAA');
});

test('Should return zzzzzz as coupon when character set is "z" and randomInteger generates always 0', () => {
  const characters = "z";
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characters, mockRandomInteger);
  expect(engine.run()).toBe('zzzzzz');
});

test('Should return aaa as coupon when character set is "a" and rendomInteger generates always 0 and length is 3', () => {
  const characters = "a";
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characters, mockRandomInteger, 3);
  expect(engine.run()).toBe('aaa');
});