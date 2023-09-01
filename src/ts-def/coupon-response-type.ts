import { PerformanceType } from './performance-type';

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
  error: {
    message: string,
    type: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any
  }
};