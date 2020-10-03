'use strict';

const {
  hasValidCharacterInFormatRuleString,
  hasEqualSumOfGroupsAndCouponLength
} = require('./validator/formatter-validator.js');

function validate(format) {
  const formatType = typeof format;
  if (formatType === 'undefined') {
    throw new Error('Format rule is not specified.');
  } else if (formatType === 'string') {
    if (!hasValidCharacterInFormatRuleString(format)) {
      throw new Error('Invalid characters used in the format rule. Only x and - are allowed.');
    }
    const groups = format.split('-').map(group => group.length);
    const groupCount = groups.reduce((sum, size) => sum + size, 0);
    const separators = '-'.repeat(groups.length - 1).split('');
    return {
      groups,
      groupCount,
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
  const { separators, groups, groupCount } = validate(formatRule);

  this.getConfig = function () {
    return { separators, groups, groupCount };
  };

  this.format = function (coupon) {
    if (!hasEqualSumOfGroupsAndCouponLength(coupon, groupCount)) {
      throw new Error('Coupon length is not equal to the sum of groups in the format.');
    }
    const { chunks } = getCouponInGroups(coupon, groups);
    return getFormattedCoupon(chunks, separators);
  };
}

module.exports = Formatter;
