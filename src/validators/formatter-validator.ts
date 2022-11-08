import { ERROR_CONSTANTS } from '../constants';
import ValidationError from '../error/validation-error';
import { isArray, isString, isEmptyArray, isInteger } from './index';
import { sumOf } from '../helpers';
import {
  ErrorType,
  FormatRuleObjectReturnType,
  FormatRuleObjectType,
  GroupErrorType,
  SeparatorErrorType
} from '../ts-def/format-rule-type';

export const getErrorsInGroups = (groups: number[]): ErrorType[] | [] => {
  return groups.reduce((error: GroupErrorType, group, index) => {
    if (isInteger(group)) {
      return error;
    }
    return [
      ...error,
      {
        field: 'groups',
        message: `Format object must only have integer elements in 'groups' array. Found error at index ${index}.`,
        type: ERROR_CONSTANTS.COUPONJS_FORMAT_ERROR.type
      }
    ];
  }, []);
};

const getErrorsInSeparators = (separators: string[]): ErrorType[] | [] => {
  return separators.reduce((error: SeparatorErrorType, separator, index) => {
    if (isString(separator)) {
      return error;
    }
    return [
      ...error,
      {
        field: 'separators',
        message: `Format object must only have string elements in 'separators' array. Found error at index ${index}.`,
        type: ERROR_CONSTANTS.COUPONJS_FORMAT_ERROR.type
      }
    ];
  }, []);
};

/**
 * This will validate the format rule string and will return the required properties needed to format coupon.
 * @param {string} ruleString This is the format rule string.
 * @returns {FormatRuleObjectReturnType}
 */
export function validateFormatRuleString(ruleString: string): FormatRuleObjectReturnType {
  const isValidFormatRuleString = /^([x]+-?[x]*)*?x$/g.test(ruleString);
  if (isValidFormatRuleString) {
    const groups = ruleString.split('-').map(group => group.length);
    const totalCharactersInGroup = sumOf(groups);
    const separators = '-'.repeat(groups.length - 1).split('');
    return {
      groups,
      separators,
      totalCharactersInGroup
    };
  }
  throw new ValidationError({
    message: 'Invalid characters used in the format rule.',
    errors: [
      {
        type: ERROR_CONSTANTS.COUPONJS_FORMAT_ERROR.type,
        field: 'format',
        message:
          'Invalid characters used in the format rule. Only x and - are allowed. And only one - inbetween like xxx-xxx.'
      }
    ]
  });
}

/**
 * This will validate the format rule object and will return the required properties needed to format coupon.
 * @param {FormatRuleObjectType} ruleObject This is the format rule object.
 * @returns {FormatRuleObjectReturnType}
 */
export function validateFormatRuleObject(
  ruleObject: FormatRuleObjectType
): FormatRuleObjectReturnType {
  const { separators, groups } = ruleObject;

  if (!isArray(separators)) {
    const message = `Format object must have field 'separators' of type array.`;
    throw new ValidationError({
      message,
      errors: [
        {
          message,
          type: ERROR_CONSTANTS.COUPONJS_FORMAT_ERROR.type,
          field: 'separators'
        }
      ]
    });
  }

  if (!isArray(groups)) {
    const message = `Format object must have field 'groups' of type array.`;
    throw new ValidationError({
      message,
      errors: [
        {
          message,
          type: ERROR_CONSTANTS.COUPONJS_FORMAT_ERROR.type,
          field: 'groups'
        }
      ]
    });
  }

  if (isEmptyArray(groups)) {
    const message = `Format object must have at least one element in the array field 'groups'.`;
    throw new ValidationError({
      message,
      errors: [
        {
          message,
          type: ERROR_CONSTANTS.COUPONJS_FORMAT_ERROR.type,
          field: 'groups'
        }
      ]
    });
  }

  if (separators.length >= groups.length) {
    const message = `Format object must not have 'separators' array with more elements than 'groups' array.`;
    throw new ValidationError({
      message,
      errors: [
        {
          message,
          type: ERROR_CONSTANTS.COUPONJS_FORMAT_ERROR.type,
          field: 'separators'
        }
      ]
    });
  }

  if (separators.length !== groups.length - 1) {
    const message = `Format object has ${
      groups.length
    } elements in 'groups' array so, it must have ${
      groups.length - 1
    } elements in 'separators' array.`;
    throw new ValidationError({
      message,
      errors: [
        {
          message,
          type: ERROR_CONSTANTS.COUPONJS_FORMAT_ERROR.type,
          field: 'separators'
        }
      ]
    });
  }

  const separatorElementTypeErrors = getErrorsInSeparators(separators);
  if (separatorElementTypeErrors.length > 0) {
    const message = `Format object has errors in 'separators' field.`;
    throw new ValidationError({
      message,
      errors: separatorElementTypeErrors
    });
  }

  const groupsElementTypeErrors = getErrorsInGroups(groups);
  if (groupsElementTypeErrors.length > 0) {
    const message = `Format object has errors in 'groups' field.`;
    throw new ValidationError({
      message,
      errors: groupsElementTypeErrors
    });
  }

  return {
    separators,
    groups,
    totalCharactersInGroup: sumOf(groups)
  };
}

/**
 * This will return true if total number of characters in the coupon is equal to the total number of characters present in the groups.
 * @param {string} coupon This is the coupon string.
 * @param {number} totalCharactersInGroup This is na integer value representing the total number of characters present in the groups.
 * @returns {boolean}
 */
export function hasEqualSumOfGroupsAndCouponLength(
  coupon: string,
  totalCharactersInGroup: number
): boolean {
  return coupon.length === totalCharactersInGroup;
}
