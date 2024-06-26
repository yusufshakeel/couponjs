import { PerformanceType } from './performance-type';
import { ErrorType } from './error-type';

export type VerboseResponseType = {
  numberOfCoupons: number,
  status: string,
  coupons: string[],
  performance?: PerformanceType
};

export type CouponResponseType = string | string[];

export type ErrorResponseType = {
  performance?: PerformanceType,
  status: string,
  error: ErrorType
};
