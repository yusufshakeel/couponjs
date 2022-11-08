import Engine from '../../src/engine';
import options from '../../src/configs/option';
import { randomInteger } from '../../src/helpers';

const { defaultCouponGenerationOption } = options;

describe('Testing Engine', () => {
  test('Should throw error if numberOfCoupons is less than 1', () => {
    expect.assertions(3);
    try {
      const characterSet = defaultCouponGenerationOption.characterSet;
      const mockRandomInteger = jest.fn(() => {
        return 0;
      });
      const prefix = defaultCouponGenerationOption.prefix;
      const suffix = defaultCouponGenerationOption.suffix;
      const engine = new Engine({
        prefix,
        suffix,
        length: 1,
        numberOfCoupons: 0,
        randomInteger: mockRandomInteger,
        characterSetOption: characterSet
      });
      engine.run();
    } catch (e: any) {
      expect(e.message).toBe('Minimum value for numberOfCoupons is 1.');
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message: 'Minimum value for numberOfCoupons is 1.',
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if numberOfCoupons is greater than 100000', () => {
    expect.assertions(3);
    try {
      const characterSet = defaultCouponGenerationOption.characterSet;
      const mockRandomInteger = jest.fn(() => {
        return 0;
      });
      const prefix = defaultCouponGenerationOption.prefix;
      const suffix = defaultCouponGenerationOption.suffix;
      const engine = new Engine({
        prefix,
        suffix,
        length: 1,
        numberOfCoupons: 100001,
        randomInteger: mockRandomInteger,
        characterSetOption: characterSet
      });
      engine.run();
    } catch (e: any) {
      expect(e.message).toBe('Maximum value for numberOfCoupons is 100000.');
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message: 'Maximum value for numberOfCoupons is 100000.',
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if length is 3 and numberOfCoupons is greater than total number of possible coupons', () => {
    expect.assertions(3);
    try {
      const characterSet = {
        custom: ['abc']
      };
      const mockRandomInteger = jest.fn(() => {
        return 0;
      });
      const prefix = defaultCouponGenerationOption.prefix;
      const suffix = defaultCouponGenerationOption.suffix;
      const engine = new Engine({
        prefix,
        suffix,
        length: 3,
        numberOfCoupons: 100,
        characterSetOption: characterSet,
        randomInteger: mockRandomInteger
      });
      engine.run();
    } catch (e: any) {
      expect(e.message).toBe(
        'Total number of possible coupons that can be generated is 27 for the given length and characterSet.'
      );
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message:
            'Total number of possible coupons that can be generated is 27 for the given length and characterSet.',
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if length is 3 and numberOfCoupons is greater than total number of possible coupons for builtIn CHARSET_ALPHA', () => {
    expect.assertions(3);
    try {
      const characterSet = {
        builtIn: ['CHARSET_ALPHA']
      };
      const mockRandomInteger = jest.fn(() => {
        return 0;
      });
      const prefix = defaultCouponGenerationOption.prefix;
      const suffix = defaultCouponGenerationOption.suffix;
      const engine = new Engine({
        prefix,
        suffix,
        length: 3,
        numberOfCoupons: 100000,
        randomInteger: mockRandomInteger,
        characterSetOption: characterSet
      });
      engine.run();
    } catch (e: any) {
      expect(e.message).toBe(
        'Total number of possible coupons that can be generated is 17576 for the given length and characterSet.'
      );
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message:
            'Total number of possible coupons that can be generated is 17576 for the given length and characterSet.',
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if length is 3 and numberOfCoupons is greater than total number of possible coupons for builtIn CHARSET_ALPHA_LOWER', () => {
    expect.assertions(3);
    try {
      const characterSet = {
        builtIn: ['CHARSET_ALPHA_LOWER']
      };
      const mockRandomInteger = jest.fn(() => {
        return 0;
      });
      const prefix = defaultCouponGenerationOption.prefix;
      const suffix = defaultCouponGenerationOption.suffix;
      const engine = new Engine({
        prefix,
        suffix,
        length: 3,
        numberOfCoupons: 100000,
        randomInteger: mockRandomInteger,
        characterSetOption: characterSet
      });
      engine.run();
    } catch (e: any) {
      expect(e.message).toBe(
        'Total number of possible coupons that can be generated is 17576 for the given length and characterSet.'
      );
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message:
            'Total number of possible coupons that can be generated is 17576 for the given length and characterSet.',
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if length is 3 and numberOfCoupons is greater than total number of possible coupons for builtIn CHARSET_DIGIT', () => {
    expect.assertions(3);
    try {
      const characterSet = {
        builtIn: ['CHARSET_DIGIT']
      };
      const mockRandomInteger = jest.fn(() => {
        return 0;
      });
      const prefix = defaultCouponGenerationOption.prefix;
      const suffix = defaultCouponGenerationOption.suffix;
      const engine = new Engine({
        prefix,
        suffix,
        length: 3,
        numberOfCoupons: 100000,
        randomInteger: mockRandomInteger,
        characterSetOption: characterSet
      });
      engine.run();
    } catch (e: any) {
      expect(e.message).toBe(
        'Total number of possible coupons that can be generated is 1000 for the given length and characterSet.'
      );
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message:
            'Total number of possible coupons that can be generated is 1000 for the given length and characterSet.',
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if length is 3 and numberOfCoupons is greater than total number of possible coupons for builtIn CHARSET_BINARY', () => {
    expect.assertions(3);
    try {
      const characterSet = {
        builtIn: ['CHARSET_BINARY']
      };
      const mockRandomInteger = jest.fn(() => {
        return 0;
      });
      const prefix = defaultCouponGenerationOption.prefix;
      const suffix = defaultCouponGenerationOption.suffix;
      const engine = new Engine({
        prefix,
        suffix,
        length: 3,
        numberOfCoupons: 100000,
        characterSetOption: characterSet,
        randomInteger: mockRandomInteger
      });
      engine.run();
    } catch (e: any) {
      expect(e.message).toBe(
        'Total number of possible coupons that can be generated is 8 for the given length and characterSet.'
      );
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message:
            'Total number of possible coupons that can be generated is 8 for the given length and characterSet.',
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if length is 3 and numberOfCoupons is greater than total number of possible coupons for builtIn CHARSET_OCTAL', () => {
    expect.assertions(3);
    try {
      const characterSet = {
        builtIn: ['CHARSET_OCTAL']
      };
      const mockRandomInteger = jest.fn(() => {
        return 0;
      });
      const prefix = defaultCouponGenerationOption.prefix;
      const suffix = defaultCouponGenerationOption.suffix;
      const engine = new Engine({
        prefix,
        suffix,
        length: 3,
        numberOfCoupons: 100000,
        randomInteger: mockRandomInteger,
        characterSetOption: characterSet
      });
      engine.run();
    } catch (e: any) {
      expect(e.message).toBe(
        'Total number of possible coupons that can be generated is 512 for the given length and characterSet.'
      );
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message:
            'Total number of possible coupons that can be generated is 512 for the given length and characterSet.',
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if length is 3 and numberOfCoupons is greater than total number of possible coupons for builtIn CHARSET_HEX', () => {
    expect.assertions(3);
    try {
      const characterSet = {
        builtIn: ['CHARSET_HEX']
      };
      const mockRandomInteger = jest.fn(() => {
        return 0;
      });
      const prefix = defaultCouponGenerationOption.prefix;
      const suffix = defaultCouponGenerationOption.suffix;
      const engine = new Engine({
        prefix,
        suffix,
        length: 3,
        numberOfCoupons: 100000,
        randomInteger: mockRandomInteger,
        characterSetOption: characterSet
      });
      engine.run();
    } catch (e: any) {
      expect(e.message).toBe(
        'Total number of possible coupons that can be generated is 4096 for the given length and characterSet.'
      );
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message:
            'Total number of possible coupons that can be generated is 4096 for the given length and characterSet.',
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if length is 2 and numberOfCoupons is greater than total number of possible coupons for builtIn CHARSET_ALNUM', () => {
    expect.assertions(3);
    try {
      const characterSet = {
        builtIn: ['CHARSET_ALNUM']
      };
      const mockRandomInteger = jest.fn(() => {
        return 0;
      });
      const prefix = defaultCouponGenerationOption.prefix;
      const suffix = defaultCouponGenerationOption.suffix;
      const engine = new Engine({
        prefix,
        suffix,
        length: 2,
        numberOfCoupons: 100000,
        randomInteger: mockRandomInteger,
        characterSetOption: characterSet
      });
      engine.run();
    } catch (e: any) {
      expect(e.message).toBe(
        'Total number of possible coupons that can be generated is 3844 for the given length and characterSet.'
      );
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'numberOfCoupons',
          message:
            'Total number of possible coupons that can be generated is 3844 for the given length and characterSet.',
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if length is less than 1', () => {
    expect.assertions(3);
    try {
      const characterSet = defaultCouponGenerationOption.characterSet;
      const mockRandomInteger = jest.fn(() => {
        return 0;
      });
      const engine = new Engine({
        length: 0,
        characterSetOption: characterSet,
        randomInteger: mockRandomInteger
      });
      engine.run();
    } catch (e: any) {
      expect(e.message).toBe("Minimum value for 'length' is 1.");
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'length',
          message: "Minimum value for 'length' is 1.",
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should throw error if length is greater than 128', () => {
    expect.assertions(3);
    try {
      const characterSet = defaultCouponGenerationOption.characterSet;
      const mockRandomInteger = jest.fn(() => {
        return 0;
      });
      const engine = new Engine({
        length: 129,
        characterSetOption: characterSet,
        randomInteger: mockRandomInteger
      });
      engine.run();
    } catch (e: any) {
      expect(e.message).toBe('Maximum value for length is 128.');
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          field: 'length',
          message: 'Maximum value for length is 128.',
          type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
        }
      ]);
    }
  });

  test('Should return a unique coupon using default character set option', () => {
    const engine = new Engine({ randomInteger });
    const coupon = engine.run();
    expect(coupon.length).toBe(6);
    expect(/^[A-Z]{6}/.test((coupon as string))).toBeTruthy();
  });

  test('Should return AAAAAA as coupon when character set is "A" and randomInteger generates always 0', () => {
    const characterSet = {
      custom: ['A']
    };
    const mockRandomInteger = jest.fn(() => {
      return 0;
    });
    const engine = new Engine({
      characterSetOption: characterSet,
      randomInteger: mockRandomInteger
    });
    expect(engine.run()).toBe('AAAAAA');
  });

  test('Should return zzzzzz as coupon when character set is "z" and randomInteger generates always 0', () => {
    const characterSet = {
      custom: ['z']
    };
    const mockRandomInteger = jest.fn(() => {
      return 0;
    });
    const engine = new Engine({
      characterSetOption: characterSet,
      randomInteger: mockRandomInteger
    });
    expect(engine.run()).toBe('zzzzzz');
  });

  test('Should return aaa as coupon when character set is "a" and randomInteger generates always 0 and length is 3', () => {
    const characterSet = {
      custom: ['a']
    };
    const mockRandomInteger = jest.fn(() => {
      return 0;
    });
    const engine = new Engine({
      length: 3,
      characterSetOption: characterSet,
      randomInteger: mockRandomInteger
    });
    expect(engine.run()).toBe('aaa');
  });

  test('Should return PREFIXaaa as coupon when character set is "a" and randomInteger generates always 0 and length is 3', () => {
    const characterSet = {
      custom: ['a']
    };
    const mockRandomInteger = jest.fn(() => {
      return 0;
    });
    const engine = new Engine({
      length: 3,
      prefix: 'PREFIX',
      characterSetOption: characterSet,
      randomInteger: mockRandomInteger
    });
    expect(engine.run()).toBe('PREFIXaaa');
  });

  test('Should return aaaSUFFIX as coupon when character set is "a" and randomInteger generates always 0 and length is 3', () => {
    const characterSet = {
      custom: ['a']
    };
    const mockRandomInteger = jest.fn(() => {
      return 0;
    });
    const engine = new Engine({
      length: 3,
      suffix: 'SUFFIX',
      characterSetOption: characterSet,
      randomInteger: mockRandomInteger
    });
    expect(engine.run()).toBe('aaaSUFFIX');
  });

  test('Should return PREFIXaaaSUFFIX as coupon when character set is "a" and randomInteger generates always 0 and length is 3', () => {
    const characterSet = {
      custom: ['a']
    };
    const mockRandomInteger = jest.fn(() => {
      return 0;
    });
    const engine = new Engine({
      prefix: 'PREFIX',
      suffix: 'SUFFIX',
      length: 3,
      randomInteger: mockRandomInteger,
      characterSetOption: characterSet
    });
    expect(engine.run()).toBe('PREFIXaaaSUFFIX');
  });

  test('Should return 2 unique coupon when character set is "abc", length is 3 and numberOfCoupons is 2', () => {
    const characterSet = {
      custom: ['abc']
    };
    const engine = new Engine({
      randomInteger,
      length: 3,
      numberOfCoupons: 2,
      characterSetOption: characterSet,
      prefix: defaultCouponGenerationOption.prefix,
      suffix: defaultCouponGenerationOption.suffix
    });
    expect(engine.run().length).toBe(2);
  });

  test('Should return 2 unique coupon when character set is "abcdef" "123456" and omit "abc" "123", length is 3 and numberOfCoupons is 2', () => {
    const characterSet = {
      custom: ['abcdef', '123456']
    };
    const engine = new Engine({
      randomInteger,
      length: 6,
      numberOfCoupons: 2,
      omitCharacters: ['abc', '123'],
      characterSetOption: characterSet,
      prefix: defaultCouponGenerationOption.prefix,
      suffix: defaultCouponGenerationOption.suffix
    });
    const coupons = engine.run();
    expect(coupons.length).toBe(2);
    (coupons as string[]).forEach(coupon => {
      expect(/^[def456]{6}/.test(coupon)).toBeTruthy();
    });
  });
});