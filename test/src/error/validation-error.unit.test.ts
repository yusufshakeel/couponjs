import ValidationError from '../../../src/error/validation-error';

describe('Testing ValidationError', () => {
  test('Should be able to set validation error', () => {
    const validationError = new ValidationError({ message: 'This is an error message' });
    expect(validationError.message).toStrictEqual('This is an error message');
    expect(validationError.type).toStrictEqual('COUPONJS_VALIDATION_ERROR');
    expect(validationError.errors).toStrictEqual([]);
  });

  test('Should be able to set array of errors for validation error', () => {
    const validationError = new ValidationError({
      message: 'This is an error message',
      errors: [{ type: 'type', field: 'field', message: 'message' }]
    });
    expect(validationError.message).toStrictEqual('This is an error message');
    expect(validationError.type).toStrictEqual('COUPONJS_VALIDATION_ERROR');
    expect(validationError.errors).toStrictEqual([{
      type: 'type',
      field: 'field',
      message: 'message'
    }]);
  });
});
