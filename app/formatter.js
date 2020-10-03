'use strict';

const {
  validateFormatRuleString,
  hasEqualSumOfGroupsAndCouponLength
} = require('./validator/formatter-validator.js');

function validate(format) {
  const formatType = typeof format;
  if (formatType === 'undefined') {
    throw new Error('Format rule is not specified.');
  } else if (formatType === 'string') {
    const result = validateFormatRuleString(format);
    if (result.validation === 'error') {
      throw new Error(result.message);
    }
    const {
      data: { groups, totalCharactersInGroup, separators }
    } = result;
    return {
      groups,
      totalCharactersInGroup,
      separators
    };
  }
  throw new Error('Invalid format rule.');
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
      throw new Error('Coupon length is not equal to the sum of groups in the format.');
    }
    const { chunks } = getCouponInGroups(coupon, groups);
    return getFormattedCoupon(chunks, separators);
  };
}

module.exports = Formatter;
