import { randomInteger, sumOf, attachPrefix, attachSuffix, pipe, identity, omit, uniqueCharacters, shallowMerge } from '../../../src/helpers';

describe('Testing helper functions', () => {
  describe('Testing random integer', () => {
    describe('When min and max both are set to 0', () => {
      test('Should return 0', () => {
        expect(randomInteger(0, 0)).toBe(0);
      });
    });

    describe('When min is set to 0 and max is set to 1', () => {
      test('Should return either 0 or 1', () => {
        const randomInt = randomInteger(0, 1);
        expect(randomInt).toBeLessThanOrEqual(1);
        expect(randomInt).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Testing sumOf', () => {
    test('Should be able to sum up', () => {
      expect(sumOf([1, 2, 3])).toBe(6);
    });
  });

  describe('Testing attachPrefix', () => {
    test('Should be able to attach prefix', () => {
      expect(attachPrefix('HELLO')('COUPON')).toBe('HELLOCOUPON');
      expect(attachPrefix()('COUPON')).toBe('COUPON');
    });
  });

  describe('Testing attachSuffix', () => {
    test('Should be able to attach suffix', () => {
      expect(attachSuffix('WORLD')('COUPON')).toBe('COUPONWORLD');
      expect(attachSuffix()('COUPON')).toBe('COUPON');
    });
  });

  describe('Testing pipe', () => {
    test('Should be able to attach prefix and suffix in that order using pipe function', () => {
      expect(pipe([attachPrefix('HELLO'), attachSuffix('WORLD')])('COUPON')).toBe('HELLOCOUPONWORLD');
    });
  });

  describe('Testing identity', () => {
    test('Should be able to return the first argument it receives using identity function', () => {
      expect(identity('foo')).toBe('foo');
      expect(identity(1)).toBe(1);
      expect(identity(null)).toBe(null);
      expect(identity(undefined)).toBe(undefined);
      expect(identity({ foo: 'bar' })).toStrictEqual({ foo: 'bar' });
      expect(identity(true)).toBeTruthy();
      expect(identity(false)).toBeFalsy();
    });
  });

  describe('Testing omit', () => {
    test('Should be able to omit values', () => {
      const values = ['A', 'B', 'C', 'D', 'E', 'F'];
      const valuesToOmit = ['A', 'B', 'F'];
      expect(omit(values, valuesToOmit)).toStrictEqual(['C', 'D', 'E']);
    });
  });

  describe('Testing uniqueCharacters', () => {
    test('Should be able to get unique characters', () => {
      expect(uniqueCharacters(['ABC', 'CD', 'EB', 'ACF'])).toStrictEqual([
        'A',
        'B',
        'C',
        'D',
        'E',
        'F'
      ]);
    });
  });

  describe('Testing shallowMerge', () => {
    test('Should be able to shallow merge without mutating the source objects', () => {
      const obj1 = { a: 1, b: 2, e: { f: [1, 2], g: { h: 10 } } };
      const obj2 = { b: 3 };
      const obj3 = { c: 4 };
      const obj4 = { e: { f: 10 } };
      expect(shallowMerge(obj1, obj2, obj3, obj4)).toStrictEqual({
        a: 1,
        b: 3,
        c: 4,
        e: {
          f: 10
        }
      });
      expect(obj1).toStrictEqual({ a: 1, b: 2, e: { f: [1, 2], g: { h: 10 } } });
      expect(obj2).toStrictEqual({ b: 3 });
      expect(obj3).toStrictEqual({ c: 4 });
      expect(obj4).toStrictEqual({ e: { f: 10 } });
    });
  });
});