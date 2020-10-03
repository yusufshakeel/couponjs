'use strict';

const Formatter = require('../../app/formatter.js');

test('Should throw error if format rule for formatter is not specified', () => {
  expect(() => {
    new Formatter();
    throw new Error('Should have failed!');
  }).toThrow('Format rule is not specified.');
});

test('Should throw error if format rule for formatter is of invalid type', () => {
  expect(() => {
    new Formatter(123);
    throw new Error('Should have failed!');
  }).toThrow('Invalid format rule.');
});

describe('Format rule of type string', () => {
  test('Should throw error if format rule for formatter contains invalid characters', () => {
    expect(() => {
      new Formatter('x-xa-x');
      throw new Error('Should have failed!');
    }).toThrow('Invalid characters used in the format rule. Only x and - are allowed.');
  });

  test('Should return separators and groups for valid format rule', () => {
    const formatter = new Formatter('x-x-x');
    expect(formatter.getConfig()).toStrictEqual({
      separators: ['-', '-'],
      groups: [1, 1, 1],
      totalCharactersInGroup: 3
    });
  });

  test('Should throw error if coupon length is not equal to the sum of groups in the format', () => {
    const formatter = new Formatter('xxxx-xxxx-xxxx');
    expect(() => formatter.format('HELLO')).toThrow(
      'Coupon length is not equal to the sum of groups in the format'
    );
  });

  test('Should return formatted coupon', () => {
    const formatter = new Formatter('xxxx-xxxx-xxxx');
    expect(formatter.format('QWERTY123456')).toBe('QWER-TY12-3456');
  });
});

describe('Format rule of type object', () => {
  test('Should throw error if required field separators is not present', () => {
    expect(() => {
      new Formatter({});
      throw new Error('Should have failed!');
    }).toThrow("Format object must have field 'separators' of type array.");
  });

  test('Should throw error if required field separators is empty array', () => {
    expect(() => {
      new Formatter({ separators: [] });
      throw new Error('Should have failed!');
    }).toThrow("Format object must have at least one element in the array field 'separators'.");
  });

  test('Should throw error if required field groups is not present', () => {
    expect(() => {
      new Formatter({ separators: ['-'] });
      throw new Error('Should have failed!');
    }).toThrow("Format object must have field 'groups' of type array.");
  });

  test('Should throw error if required field groups is empty array', () => {
    expect(() => {
      new Formatter({ separators: ['-'], groups: [] });
      throw new Error('Should have failed!');
    }).toThrow("Format object must have at least one element in the array field 'groups'.");
  });

  test('Should throw error if elements in separators array is more than groups', () => {
    expect(() => {
      new Formatter({ separators: ['-', '-'], groups: [4] });
      throw new Error('Should have failed!');
    }).toThrow(
      "Format object must not have 'separators' array with more elements than 'groups' array."
    );
  });

  test('Should throw error if elements in separators array is lesser than groups', () => {
    expect(() => {
      new Formatter({ separators: ['-'], groups: [4, 4, 4] });
      throw new Error('Should have failed!');
    }).toThrow("Format object must have 2 elements in 'separators' array.");
  });

  test('Should return formatted coupon', () => {
    const formatter = new Formatter({ separators: ['-', '-'], groups: [4, 4, 4] });
    expect(formatter.format('QWERTY123456')).toBe('QWER-TY12-3456');
  });
});
