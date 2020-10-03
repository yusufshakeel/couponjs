'use strict';

const ValidationError = require('../../../app/error/validation-error.js');

test('Should be able to set validation error', () => {
  const validationError = new ValidationError({ message: 'This is an error message' });
  expect(validationError.message).toStrictEqual('This is an error message');
  expect(validationError.type).toStrictEqual('COUPONJS_VALIDATION_ERROR');
  expect(validationError.errors).toStrictEqual([]);
});

test('Should be able to set array of errors for validation error', () => {
  const validationError = new ValidationError({
    message: 'This is an error message',
    errors: [{ err: 'err...' }]
  });
  expect(validationError.message).toStrictEqual('This is an error message');
  expect(validationError.type).toStrictEqual('COUPONJS_VALIDATION_ERROR');
  expect(validationError.errors).toStrictEqual([{ err: 'err...' }]);
});
