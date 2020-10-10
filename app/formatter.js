'use strict';

const { ERROR_CONSTANTS } = require('./constants.js');
const ValidationError = require('./error/validation-error.js');
const { isUndefined } = require('./validator/validator.js');
const {
  validateFormatRuleString,
  validateFormatRuleObject,
  hasEqualSumOfGroupsAndCouponLength
} = require('./validator/formatter-validator.js');

function validate(format) {
  const formatType = typeof format;

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
  } else if (formatType === 'string') {
    const result = validateFormatRuleString(format);
    const { groups, totalCharactersInGroup, separators } = result;
    return {
      groups,
      totalCharactersInGroup,
      separators
    };
  } else if (formatType === 'object') {
    const result = validateFormatRuleObject(format);
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

function getCouponInGroups(coupon, groups) {
  return groups.reduce(
    (result, currentGroupSize) => {
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

function getFormattedCoupon(couponChunks, separators) {
  const separatorLength = separators.length;
  return couponChunks.reduce((formattedCoupon, currentChunk, index) => {
    return index < separatorLength
      ? `${formattedCoupon}${currentChunk}${separators[index]}`
      : `${formattedCoupon}${currentChunk}`;
  }, '');
}

function Formatter(formatRule) {
  const { separators, groups, totalCharactersInGroup } = validate(formatRule);

  this.getConfig = function () {
    return { separators, groups, totalCharactersInGroup };
  };

  this.format = function (coupon) {
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
    const { chunks } = getCouponInGroups(coupon, groups);
    return getFormattedCoupon(chunks, separators);
  };
}

module.exports = Formatter;
