'use strict';

function hasValidCharacterInFormatRuleString(ruleString) {
  return /^x([x-]*x)?$/g.test(ruleString);
}

function hasEqualSumOfGroupsAndCouponLength(coupon, groupLength) {
  return coupon.length === groupLength;
}

module.exports = {
  hasValidCharacterInFormatRuleString,
  hasEqualSumOfGroupsAndCouponLength
};
