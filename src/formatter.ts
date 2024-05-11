import { ERROR_CONSTANTS } from './constants/error-constants';
import ValidationError from './error/validation-error';
import { isObject, isString, isUndefined } from './validators';
import {
  validateFormatRuleString,
  validateFormatRuleObject,
  hasEqualSumOfGroupsAndCouponLength
} from './validators/formatter-validator';
import { FormatRuleObjectReturnType, FormatRuleObjectType } from './ts-def/format-rule-type';

type FormatRuleType = string | FormatRuleObjectType;
type CouponInGroupsType = { chunks: string[], lengthCovered: number };

export default class Formatter {
  private formatRule: FormatRuleType;
  private formatRuleResult: FormatRuleObjectReturnType;

  constructor(formatRule: FormatRuleType) {
    this.formatRule = formatRule;
    this.formatRuleResult = this.validate(formatRule);
  }

  public getConfig(): FormatRuleObjectReturnType {
    return this.formatRuleResult;
  }

  public format(coupon: string) {
    const { separators, groups, totalCharactersInGroup } = this.formatRuleResult;
    if (!hasEqualSumOfGroupsAndCouponLength(coupon, totalCharactersInGroup)) {
      const message = 'Coupon length is not equal to the sum of groups in the format.';
      throw new ValidationError({
        message,
        errors: [
          {
            message: `Coupon length: ${coupon.length} and sum of groups: ${groups.join(
              '+'
            )} = ${totalCharactersInGroup}`,
            type: ERROR_CONSTANTS.COUPONJS_FORMAT_ERROR.type,
            field: 'format'
          }
        ]
      });
    }
    const { chunks } = this.getCouponInGroups(coupon, groups);
    return this.getFormattedCoupon(chunks, separators);
  }

  private getFormattedCoupon(couponChunks: string[], separators: string[]): string {
    const separatorLength = separators.length;
    return couponChunks.reduce((formattedCoupon, currentChunk, index) => {
      return index < separatorLength
        ? `${formattedCoupon}${currentChunk}${separators[index]}`
        : `${formattedCoupon}${currentChunk}`;
    }, '');
  }

  private getCouponInGroups(coupon: string, groups: number[]): CouponInGroupsType {
    return groups.reduce(
      (result: CouponInGroupsType, currentGroupSize) => {
        const { chunks, lengthCovered } = result;
        const chunk = coupon.substring(lengthCovered, lengthCovered + currentGroupSize);
        return {
          chunks: [...chunks, chunk],
          lengthCovered: lengthCovered + currentGroupSize
        };
      },
      { chunks: [], lengthCovered: 0 }
    );
  }

  private validate(format: FormatRuleType): FormatRuleObjectReturnType {
    if (isUndefined(format)) {
      const message = 'Format rule is not specified.';
      throw new ValidationError({
        message,
        errors: [
          {
            message,
            type: ERROR_CONSTANTS.COUPONJS_FORMAT_ERROR.type,
            field: 'format'
          }
        ]
      });
    } else if (isString(format)) {
      const result = validateFormatRuleString((format as string));
      const { groups, totalCharactersInGroup, separators } = result;
      return {
        groups,
        totalCharactersInGroup,
        separators
      };
    } else if (isObject(format)) {
      const result = validateFormatRuleObject((format as FormatRuleObjectType));
      const { groups, totalCharactersInGroup, separators } = result;
      return {
        groups,
        totalCharactersInGroup,
        separators
      };
    }

    throw new ValidationError({
      message: 'Invalid format rule.',
      errors: [
        {
          message: 'Invalid format rule.',
          type: ERROR_CONSTANTS.COUPONJS_FORMAT_ERROR.type,
          field: 'format'
        }
      ]
    });
  }
}