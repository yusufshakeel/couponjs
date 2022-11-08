import Coupon from '../../src';

describe('Testing couponjs', () => {
  describe('Coupon engine configuration', () => {
    describe('verbose tests', () => {
      test('Should return verbose response', () => {
        const coupon = new Coupon({ verbose: true });
        const result = coupon.generate();
        expect(result.status).toBe('success');
        expect(result.numberOfCoupons).toBe(1);
        expect(/^[A-Z]{6}$/.test(result.coupons[0])).toBeTruthy();
      });

      test('Should return verbose response - multiple coupons', () => {
        const coupon = new Coupon({ verbose: true });
        const result = coupon.generate({ numberOfCoupons: 2 });
        expect(result.status).toBe('success');
        expect(result.numberOfCoupons).toBe(2);
        result.coupons.forEach((coupon: string) => expect(/^[A-Z]{6}$/.test(coupon)).toBeTruthy());
      });

      test('Should return verbose validation error', () => {
        const coupon = new Coupon({ verbose: true });
        const result = coupon.generate({ format: 'abc-xyz' });
        expect(result).toStrictEqual({
          status: 'error',
          error: {
            type: 'COUPONJS_VALIDATION_ERROR',
            message: 'Invalid characters used in the format rule.',
            errors: [
              {
                field: 'format',
                message:
                  'Invalid characters used in the format rule. Only x and - are allowed. And only one - inbetween like xxx-xxx.',
                type: 'COUPONJS_FORMAT_ERROR'
              }
            ]
          }
        });
      });
    });

    describe('performance test', () => {
      test('Should log performance', () => {
        const coupon = new Coupon({ verbose: true, logPerformance: true });
        const result = coupon.generate();
        expect(result.status).toBe('success');
        expect(result.numberOfCoupons).toBe(1);
        expect(/^[A-Z]{6}$/.test(result.coupons[0])).toBeTruthy();
        expect(result.performance).not.toBeUndefined();
        expect(result.performance.duration).not.toBeUndefined();
        expect(result.performance.duration.nano).not.toBeUndefined();
        expect(result.performance.duration.micro).not.toBeUndefined();
        expect(result.performance.duration.milli).not.toBeUndefined();
        expect(result.performance.duration.second).not.toBeUndefined();
      });

      test('Should return verbose validation error and also log performance', () => {
        const coupon = new Coupon({ verbose: true, logPerformance: true });
        const result = coupon.generate({ format: 'abc-xyz' });
        expect(result.status).toBe('error');
        expect(result.error).toStrictEqual({
          type: 'COUPONJS_VALIDATION_ERROR',
          message: 'Invalid characters used in the format rule.',
          errors: [
            {
              field: 'format',
              message:
                'Invalid characters used in the format rule. Only x and - are allowed. And only one - inbetween like xxx-xxx.',
              type: 'COUPONJS_FORMAT_ERROR'
            }
          ]
        });
        expect(result.performance).not.toBeUndefined();
        expect(result.performance.duration).not.toBeUndefined();
        expect(result.performance.duration.nano).not.toBeUndefined();
        expect(result.performance.duration.micro).not.toBeUndefined();
        expect(result.performance.duration.milli).not.toBeUndefined();
        expect(result.performance.duration.second).not.toBeUndefined();
      });
    });

    describe('maxNumberOfCouponsToGenerate test', () => {
      test('Should be able to generate max 10 coupons', () => {
        const coupon = new Coupon({ maxNumberOfCouponsToGenerate: 10 });
        const result = coupon.generate({ numberOfCoupons: 10 });
        expect(result.length).toBe(10);
      });

      test('Should throw error if trying to generate more coupons then permitted', () => {
        expect.assertions(3);
        try {
          const coupon = new Coupon({ maxNumberOfCouponsToGenerate: 10 });
          coupon.generate({ numberOfCoupons: 100 });
        } catch (e: any) {
          expect(e.message).toBe('Maximum value for numberOfCoupons is 10.');
          expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
          expect(e.errors).toStrictEqual([
            {
              field: 'numberOfCoupons',
              message: 'Maximum value for numberOfCoupons is 10.',
              type: 'COUPONJS_GENERATE_COUPON_CONFIGURATION_ERROR'
            }
          ]);
        }
      });
    });
  });

  test('Should throw validation error', () => {
    try {
      const coupon = new Coupon();
      coupon.generate({ format: 'abc-xyz' });
    } catch (e: any) {
      expect(e.message).toBe('Invalid characters used in the format rule.');
      expect(e.type).toBe('COUPONJS_VALIDATION_ERROR');
      expect(e.errors).toStrictEqual([
        {
          type: 'COUPONJS_FORMAT_ERROR',
          field: 'format',
          message:
            'Invalid characters used in the format rule. Only x and - are allowed. And only one - inbetween like xxx-xxx.'
        }
      ]);
    }
  });

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

  test('Should generate coupon code using uppercase alphabet A-Z of length 6,7,8,9,10.', () => {
    const coupon = new Coupon();
    expect(/^[A-Z]{6}$/.test(coupon.generate({ length: 6 }))).toBeTruthy();
    expect(/^[A-Z]{7}$/.test(coupon.generate({ length: 7 }))).toBeTruthy();
    expect(/^[A-Z]{8}$/.test(coupon.generate({ length: 8 }))).toBeTruthy();
    expect(/^[A-Z]{9}$/.test(coupon.generate({ length: 9 }))).toBeTruthy();
    expect(/^[A-Z]{10}$/.test(coupon.generate({ length: 10 }))).toBeTruthy();
  });

  test('Should generate coupon code using uppercase alphabet A-Z of length 6 including prefix "SUPER"', () => {
    const coupon = new Coupon();
    const result = coupon.generate({ length: 6, prefix: 'SUPER' });
    expect(/^SUPER[A-Z]{6}$/.test(result)).toBeTruthy();
  });

  test('Should generate coupon code using uppercase alphabet A-Z of length 6 including prefix "SUPER" and suffix "AWESOME"', () => {
    const coupon = new Coupon();
    const result = coupon.generate({
      length: 6,
      prefix: 'SUPER',
      suffix: 'AWESOME'
    });
    expect(/^SUPER[A-Z]{6}AWESOME$/.test(result)).toBeTruthy();
  });

  test('Should generate coupon code using uppercase alphabet A-Z of length 6 including suffix "AWESOME"', () => {
    const coupon = new Coupon();
    const result = coupon.generate({ length: 6, suffix: 'AWESOME' });
    expect(/^[A-Z]{6}AWESOME$/.test(result)).toBeTruthy();
  });

  test('Should generate coupon code using uppercase alphabet A-Z of length 6,7,8,9,10 including prefix "SUPER"', () => {
    const coupon = new Coupon();
    expect(/^SUPER[A-Z]{6}$/.test(coupon.generate({ length: 6, prefix: 'SUPER' }))).toBeTruthy();
    expect(/^SUPER[A-Z]{7}$/.test(coupon.generate({ length: 7, prefix: 'SUPER' }))).toBeTruthy();
    expect(/^SUPER[A-Z]{8}$/.test(coupon.generate({ length: 8, prefix: 'SUPER' }))).toBeTruthy();
    expect(/^SUPER[A-Z]{9}$/.test(coupon.generate({ length: 9, prefix: 'SUPER' }))).toBeTruthy();
    expect(/^SUPER[A-Z]{10}$/.test(coupon.generate({ length: 10, prefix: 'SUPER' }))).toBeTruthy();
  });

  test('Should generate coupon code using uppercase alphabet A-Z of length 6,7,8,9,10 including prefix "SUPER" and suffix "AWESOME"', () => {
    const coupon = new Coupon();
    expect(
      /^SUPER[A-Z]{6}AWESOME$/.test(
        coupon.generate({ length: 6, prefix: 'SUPER', suffix: 'AWESOME' })
      )
    ).toBeTruthy();
    expect(
      /^SUPER[A-Z]{7}AWESOME$/.test(
        coupon.generate({ length: 7, prefix: 'SUPER', suffix: 'AWESOME' })
      )
    ).toBeTruthy();
    expect(
      /^SUPER[A-Z]{8}AWESOME$/.test(
        coupon.generate({ length: 8, prefix: 'SUPER', suffix: 'AWESOME' })
      )
    ).toBeTruthy();
    expect(
      /^SUPER[A-Z]{9}AWESOME$/.test(
        coupon.generate({ length: 9, prefix: 'SUPER', suffix: 'AWESOME' })
      )
    ).toBeTruthy();
    expect(
      /^SUPER[A-Z]{10}AWESOME$/.test(
        coupon.generate({
          length: 10,
          prefix: 'SUPER',
          suffix: 'AWESOME'
        })
      )
    ).toBeTruthy();
  });

  test('Should generate coupon code using uppercase alphabet A-Z of length 6,7,8,9,10 including suffix "AWESOME"', () => {
    const coupon = new Coupon();
    expect(/^[A-Z]{6}AWESOME$/.test(coupon.generate({ length: 6, suffix: 'AWESOME' }))).toBeTruthy();
    expect(/^[A-Z]{7}AWESOME$/.test(coupon.generate({ length: 7, suffix: 'AWESOME' }))).toBeTruthy();
    expect(/^[A-Z]{8}AWESOME$/.test(coupon.generate({ length: 8, suffix: 'AWESOME' }))).toBeTruthy();
    expect(/^[A-Z]{9}AWESOME$/.test(coupon.generate({ length: 9, suffix: 'AWESOME' }))).toBeTruthy();
    expect(
      /^[A-Z]{10}AWESOME$/.test(coupon.generate({ length: 10, suffix: 'AWESOME' }))
    ).toBeTruthy();
  });

  test('Should generate coupon code using characterSet builtIn uppercase alphabet option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      characterSet: {
        builtIn: ['CHARSET_ALPHA']
      }
    });
    expect(/^[A-Z]{6}$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate coupon code using characterSet builtIn lowercase alphabet option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      characterSet: {
        builtIn: ['CHARSET_ALPHA_LOWER']
      }
    });
    expect(/^[a-z]{6}$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate coupon code using characterSet builtIn digit option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      characterSet: {
        builtIn: ['CHARSET_DIGIT']
      }
    });
    expect(/^[0-9]{6}$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate coupon code using characterSet builtIn alphabet uppercase, lowercase and digit option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      characterSet: {
        builtIn: ['CHARSET_ALPHA', 'CHARSET_ALPHA_LOWER', 'CHARSET_DIGIT']
      }
    });
    expect(/^[A-Za-z0-9]{6}$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate coupon code using characterSet custom uppercase alphabet option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      characterSet: {
        custom: ['ABC']
      }
    });
    expect(/^[A-C]{6}$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate coupon code using characterSet custom lowercase alphabet option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      characterSet: {
        custom: ['xyz']
      }
    });
    expect(/^[x-z]{6}$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate coupon code using characterSet custom digit option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      characterSet: {
        custom: ['123']
      }
    });
    expect(/^[1-3]{6}$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate coupon code using characterSet custom uppercase, lowercase alphabet, digit and symbol option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      characterSet: {
        custom: ['ABC', 'xyz', '123', '@$&']
      }
    });
    expect(/^[A-Cx-z1-3@$&]{6}$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate coupon code using characterSet builtIn and custom option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      characterSet: {
        builtIn: ['CHARSET_ALPHA', 'CHARSET_ALPHA_LOWER', 'CHARSET_DIGIT'],
        custom: ['ABC', 'xyz', '123', '@$&']
      }
    });
    expect(/^[A-Za-z0-9@$&]{6}$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate coupon code of length 8 with prefix and suffix and using characterSet builtIn and custom option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      length: 8,
      prefix: 'SUPER',
      suffix: 'AWESOME',
      characterSet: {
        builtIn: ['CHARSET_ALPHA', 'CHARSET_ALPHA_LOWER', 'CHARSET_DIGIT'],
        custom: ['ABC', 'xyz', '123', '@$&']
      }
    });
    expect(/^SUPER[A-Za-z0-9@$&]{8}AWESOME$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate coupon code using characterSet builtIn CHARSET_ALNUM option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      characterSet: {
        builtIn: ['CHARSET_ALNUM']
      }
    });
    expect(/^[A-Za-z0-9]{6}$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate coupon code using characterSet builtIn CHARSET_BINARY option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      characterSet: {
        builtIn: ['CHARSET_BINARY']
      }
    });
    expect(/^[01]{6}$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate coupon code using characterSet builtIn CHARSET_OCTAL option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      characterSet: {
        builtIn: ['CHARSET_OCTAL']
      }
    });
    expect(/^[0-7]{6}$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate coupon code using characterSet builtIn CHARSET_HEX option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      characterSet: {
        builtIn: ['CHARSET_HEX']
      }
    });
    expect(/^[0-9A-F]{6}$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate coupon code using characterSet builtIn CHARSET_HEX_LOWER option', () => {
    const coupon = new Coupon();
    const myCoupon = coupon.generate({
      characterSet: {
        builtIn: ['CHARSET_HEX_LOWER']
      }
    });
    expect(/^[0-9a-f]{6}$/.test(myCoupon)).toBeTruthy();
  });

  test('Should generate 100 unique coupons of length 8 using builtIn "CHARSET_ALNUM" option', () => {
    const coupon = new Coupon();
    const myCoupons = coupon.generate({
      characterSet: {
        builtIn: ['CHARSET_ALNUM']
      },
      length: 8,
      numberOfCoupons: 100
    });
    const unqiueCoupons = [];
    for (const myCoupon of myCoupons) {
      expect(/^[A-Za-z0-9]{8}$/.test(myCoupon)).toBeTruthy();
      if (unqiueCoupons.indexOf(myCoupon) === -1) {
        unqiueCoupons.push(myCoupon);
      }
    }
    expect(unqiueCoupons.length).toBe(myCoupons.length);
  });

  test('Should generate 100 unique coupons of length 8 using builtIn "CHARSET_ALNUM" option with prefix and suffix', () => {
    const coupon = new Coupon();
    const myCoupons = coupon.generate({
      characterSet: {
        builtIn: ['CHARSET_ALNUM']
      },
      length: 8,
      prefix: 'SUPER',
      suffix: 'AWESOME',
      numberOfCoupons: 100
    });
    const unqiueCoupons = [];
    for (const myCoupon of myCoupons) {
      expect(/^SUPER[A-Za-z0-9]{8}AWESOME$/.test(myCoupon)).toBeTruthy();
      if (unqiueCoupons.indexOf(myCoupon) === -1) {
        unqiueCoupons.push(myCoupon);
      }
    }
    expect(unqiueCoupons.length).toBe(myCoupons.length);
  });

  test('Should generate 100 unique coupons of length 128 using builtIn "CHARSET_ALNUM" option', () => {
    const coupon = new Coupon();
    const myCoupons = coupon.generate({
      characterSet: {
        builtIn: ['CHARSET_ALNUM']
      },
      length: 128,
      numberOfCoupons: 100
    });
    const unqiueCoupons = [];
    for (const myCoupon of myCoupons) {
      expect(/^[A-Za-z0-9]{128}$/.test(myCoupon)).toBeTruthy();
      if (unqiueCoupons.indexOf(myCoupon) === -1) {
        unqiueCoupons.push(myCoupon);
      }
    }
    expect(unqiueCoupons.length).toBe(myCoupons.length);
  });

  test('Should generate 100 unique coupons of length 128 using builtIn "CHARSET_ALNUM" option with prefix and suffix', () => {
    const coupon = new Coupon();
    const myCoupons = coupon.generate({
      characterSet: {
        builtIn: ['CHARSET_ALNUM']
      },
      length: 128,
      prefix: 'SUPER',
      suffix: 'AWESOME',
      numberOfCoupons: 100
    });
    const unqiueCoupons = [];
    for (const myCoupon of myCoupons) {
      expect(/^SUPER[A-Za-z0-9]{128}AWESOME$/.test(myCoupon)).toBeTruthy();
      if (unqiueCoupons.indexOf(myCoupon) === -1) {
        unqiueCoupons.push(myCoupon);
      }
    }
    expect(unqiueCoupons.length).toBe(myCoupons.length);
  });

  test('Should generate coupon code using uppercase alphabet A-Z of length 6 and omit "ABCDEFGH"', () => {
    const coupon = new Coupon();
    const result = coupon.generate({ omitCharacters: ['ABC', 'XYZ'] });
    expect(/^[D-W]{6}$/.test(result)).toBeTruthy();
  });

  describe('Generate coupon with string format rule', () => {
    test('Should generate coupon code using string format rule', () => {
      const coupon = new Coupon();
      const result = coupon.generate({ length: 12, format: 'xx-xxxx-xxxx-xx' });
      expect(/^[A-Z]{2}-[A-Z]{4}-[A-Z]{4}-[A-Z]{2}$/.test(result)).toBeTruthy();
    });

    test('Should generate multiple coupon codes using string format rule', () => {
      const coupon = new Coupon();
      const result = coupon.generate({ length: 12, numberOfCoupons: 3, format: 'xx-xxxx-xxxx-xx' });
      result.forEach((coupon: string) => expect(/^[A-Z]{2}-[A-Z]{4}-[A-Z]{4}-[A-Z]{2}$/.test(coupon)).toBeTruthy());
    });

    test('Should generate coupon code using string format rule and prefix and suffix', () => {
      const coupon = new Coupon();
      const result = coupon.generate({
        prefix: 'HELLO',
        suffix: 'WORLD',
        length: 6,
        format: 'xxxx-xxxx-xxxx-xxxx'
      });
      expect(/^[A-Z]{4}-[A-Z]{4}-[A-Z]{4}-[A-Z]{4}$/.test(result)).toBeTruthy();
    });

    test('Should generate multiple coupon code using string format rule and prefix and suffix', () => {
      const coupon = new Coupon();
      const result = coupon.generate({
        prefix: 'HELLO',
        suffix: 'WORLD',
        length: 6,
        numberOfCoupons: 3,
        format: 'xxxx-xxxx-xxxx-xxxx'
      });
      result.forEach((coupon: string) => expect(/^[A-Z]{4}-[A-Z]{4}-[A-Z]{4}-[A-Z]{4}$/.test(coupon)).toBeTruthy());
    });
  });

  describe('Generate coupon with object format rule', () => {
    test('Should generate coupon code using object format rule', () => {
      const coupon = new Coupon();
      const result = coupon.generate({
        length: 12,
        format: { separators: ['-', '-'], groups: [4, 4, 4] }
      });
      expect(/^[A-Z]{4}-[A-Z]{4}-[A-Z]{4}$/.test(result)).toBeTruthy();
    });

    test('Should generate multiple coupon codes using object format rule', () => {
      const coupon = new Coupon();
      const result = coupon.generate({
        length: 12,
        numberOfCoupons: 3,
        format: { separators: ['-', '-'], groups: [4, 4, 4] }
      });
      result.forEach((coupon: string) => expect(/^[A-Z]{4}-[A-Z]{4}-[A-Z]{4}$/.test(coupon)).toBeTruthy());
    });

    test('Should generate coupon code using object format rule and prefix and suffix', () => {
      const coupon = new Coupon();
      const result = coupon.generate({
        prefix: 'QWERT',
        suffix: 'ZXCVB',
        length: 6,
        format: { separators: ['-', '~', '-'], groups: [4, 4, 4, 4] }
      });
      expect(/^[A-Z]{4}-[A-Z]{4}~[A-Z]{4}-[A-Z]{4}$/.test(result)).toBeTruthy();
    });

    test('Should generate multiple coupon code using object format rule and prefix and suffix', () => {
      const coupon = new Coupon();
      const result = coupon.generate({
        prefix: 'QWERT',
        suffix: 'ZXCVB',
        length: 6,
        numberOfCoupons: 3,
        format: { separators: ['-', '~', '-'], groups: [4, 4, 4, 4] }
      });
      result.forEach((coupon: string) => expect(/^[A-Z]{4}-[A-Z]{4}~[A-Z]{4}-[A-Z]{4}$/.test(coupon)).toBeTruthy());
    });
  });
});