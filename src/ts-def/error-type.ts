import { ErrorsType } from './errors-type';

export type ErrorType = {
  message: string,
  type: string,
  errors: ErrorsType[]
}
