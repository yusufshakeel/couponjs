const Engine = require('../../app/engine.js');

test('Should throw error if length is less than 1', () => {
  expect(() => {
    const characters = 'A';
    const mockRandomInteger = jest.fn((min, max) => {
      return 0;
    });
    const engine = new Engine(characters, mockRandomInteger, 0);
    engine.run();
    throw new Error('Should have failed.');
  }).toThrow('Minimum value for "length" is 1.');
});

test('Should throw error if length is greater than 128', () => {
  expect(() => {
    const characters = 'A';
    const mockRandomInteger = jest.fn((min, max) => {
      return 0;
    });
    const engine = new Engine(characters, mockRandomInteger, 200);
    engine.run();
    throw new Error('Should have failed.');
  }).toThrow('Maximum value for "length" is 128.');
});

test('Should return AAAAAA as coupon when character set is "A" and randomInteger generates always 0', () => {
  const characters = 'A';
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characters, mockRandomInteger);
  expect(engine.run()).toBe('AAAAAA');
});

test('Should return zzzzzz as coupon when character set is "z" and randomInteger generates always 0', () => {
  const characters = 'z';
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characters, mockRandomInteger);
  expect(engine.run()).toBe('zzzzzz');
});

test('Should return aaa as coupon when character set is "a" and rendomInteger generates always 0 and length is 3', () => {
  const characters = 'a';
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characters, mockRandomInteger, 3);
  expect(engine.run()).toBe('aaa');
});

test('Should return PREFIXaaa as coupon when character set is "a" and rendomInteger generates always 0 and length is 3', () => {
  const characters = 'a';
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characters, mockRandomInteger, 3, 'PREFIX');
  expect(engine.run()).toBe('PREFIXaaa');
});

test('Should return aaaSUFFIX as coupon when character set is "a" and rendomInteger generates always 0 and length is 3', () => {
  const characters = 'a';
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characters, mockRandomInteger, 3, '', 'SUFFIX');
  expect(engine.run()).toBe('aaaSUFFIX');
});

test('Should return PREFIXaaaSUFFIX as coupon when character set is "a" and rendomInteger generates always 0 and length is 3', () => {
  const characters = 'a';
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characters, mockRandomInteger, 3, 'PREFIX', 'SUFFIX');
  expect(engine.run()).toBe('PREFIXaaaSUFFIX');
});