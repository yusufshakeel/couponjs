import { ERROR_CONSTANTS } from '../constants';

export default class ValidationError extends Error {
  public type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public errors: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ message, errors = [] }: { message: string, errors?: any[] }) {
    super(message);
    this.type = ERROR_CONSTANTS.COUPONJS_VALIDATION_ERROR.type;
    this.errors = errors;
  }
}