import { ERROR_CONSTANTS } from '../constants/error-constants';
import { ErrorsType } from '../ts-def/errors-type';

export type ValidationErrorConstructorArgsType = {
  message: string;
  errors?: ErrorsType[];
};

export default class ValidationError extends Error {
  public type: string;
  public errors: ErrorsType[];

  constructor({ message, errors = [] }: ValidationErrorConstructorArgsType) {
    super(message);
    this.type = ERROR_CONSTANTS.COUPONJS_VALIDATION_ERROR.type;
    this.errors = errors;
  }
}