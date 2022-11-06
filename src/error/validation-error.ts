import { ERROR_CONSTANTS } from '../constants';

export default class ValidationError extends Error {
  public type: string;
  public errors: any[];
  constructor({ message, errors = [] }: { message: string, errors?: any[] }) {
    super(message);
    this.type = ERROR_CONSTANTS.COUPONJS_VALIDATION_ERROR.type;
    this.errors = errors;
  }
}