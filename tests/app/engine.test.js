const Engine = require('../../app/engine.js');
const defaultOption = require('../../app/option.js');
const randomInteger = require('../../app/random-integer.js');

test('Should throw error if numberOfCoupons is less than 1', () => {
  expect(() => {
    const characterSet = defaultOption.characterSet;
    const mockRandomInteger = jest.fn((min, max) => {
      return 0;
    });
    const prefix = defaultOption.prefix;
    const suffix = defaultOption.suffix;
    const engine = new Engine(characterSet, mockRandomInteger, 1, prefix, suffix, 0);
    engine.run();
    throw new Error('Should have failed.');
  }).toThrow('Minimum value for numberOfCoupons is 1.');
});

test('Should throw error if numberOfCoupons is greater than 100000', () => {
  expect(() => {
    const characterSet = defaultOption.characterSet;
    const mockRandomInteger = jest.fn((min, max) => {
      return 0;
    });
    const prefix = defaultOption.prefix;
    const suffix = defaultOption.suffix;
    const engine = new Engine(characterSet, mockRandomInteger, 1, prefix, suffix, 100001);
    engine.run();
    throw new Error('Should have failed.');
  }).toThrow('Minimum value for numberOfCoupons is 100000.');
});

test('Should throw error if numberOfCoupons is greater than total number of possible coupons', () => {
  expect(() => {
    const characterSet = {
      custom: ['abc']
    };
    const mockRandomInteger = jest.fn((min, max) => {
      return 0;
    });
    const prefix = defaultOption.prefix;
    const suffix = defaultOption.suffix;
    const engine = new Engine(characterSet, mockRandomInteger, 3, prefix, suffix, 100);
    engine.run();
    throw new Error('Should have failed.');
  }).toThrow('Total number of possible coupons that can be generated is 27.');
});

test('Should throw error if length is less than 1', () => {
  expect(() => {
    const characterSet = defaultOption.characterSet;
    const mockRandomInteger = jest.fn((min, max) => {
      return 0;
    });
    const engine = new Engine(characterSet, mockRandomInteger, 0);
    engine.run();
    throw new Error('Should have failed.');
  }).toThrow('Minimum value for length is 1.');
});

test('Should throw error if length is greater than 128', () => {
  expect(() => {
    const characterSet = defaultOption.characterSet;
    const mockRandomInteger = jest.fn((min, max) => {
      return 0;
    });
    const engine = new Engine(characterSet, mockRandomInteger, 129);
    engine.run();
    throw new Error('Should have failed.');
  }).toThrow('Maximum value for length is 128.');
});

test('Should return AAAAAA as coupon when character set is "A" and randomInteger generates always 0', () => {
  const characterSet = {
    custom: ['A']
  };
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characterSet, mockRandomInteger);
  expect(engine.run()).toBe('AAAAAA');
});

test('Should return zzzzzz as coupon when character set is "z" and randomInteger generates always 0', () => {
  const characterSet = {
    custom: ['z']
  };
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characterSet, mockRandomInteger);
  expect(engine.run()).toBe('zzzzzz');
});

test('Should return aaa as coupon when character set is "a" and randomInteger generates always 0 and length is 3', () => {
  const characterSet = {
    custom: ['a']
  };
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characterSet, mockRandomInteger, 3);
  expect(engine.run()).toBe('aaa');
});

test('Should return PREFIXaaa as coupon when character set is "a" and randomInteger generates always 0 and length is 3', () => {
  const characterSet = {
    custom: ['a']
  };
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characterSet, mockRandomInteger, 3, 'PREFIX');
  expect(engine.run()).toBe('PREFIXaaa');
});

test('Should return aaaSUFFIX as coupon when character set is "a" and randomInteger generates always 0 and length is 3', () => {
  const characterSet = {
    custom: ['a']
  };
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characterSet, mockRandomInteger, 3, '', 'SUFFIX');
  expect(engine.run()).toBe('aaaSUFFIX');
});

test('Should return PREFIXaaaSUFFIX as coupon when character set is "a" and randomInteger generates always 0 and length is 3', () => {
  const characterSet = {
    custom: ['a']
  };
  const mockRandomInteger = jest.fn((min, max) => {
    return 0;
  });
  const engine = new Engine(characterSet, mockRandomInteger, 3, 'PREFIX', 'SUFFIX');
  expect(engine.run()).toBe('PREFIXaaaSUFFIX');
});

test('Should return 2 unique coupon when character set is "abc", length is 3 and numberOfCoupons is 2', () => {
  const characterSet = {
    custom: ['abc']
  };
  const engine = new Engine(characterSet, randomInteger, 3, defaultOption.prefix, defaultOption.suffix, 2);
  expect(engine.run().length).toBe(2);
});