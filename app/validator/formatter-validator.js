'use strict';

function hasValidCharacterInFormatRuleString(ruleString) {
  return /^x([x-]*x)?$/g.test(ruleString);
}

function hasValidPropertiesInFormatRuleObject(ruleObject) {
  const { separators, groups } = ruleObject;
  if (!Array.isArray(separators)) {
    return {
      validation: 'error',
      field: 'separators',
      message: `Format object must have field 'separators' of type array.`
    };
  }
  if (Array.isArray(separators) && separators.length === 0) {
    return {
      validation: 'error',
      field: 'separators',
      message: `Format object must have at least one element in the array field 'separators'.`
    };
  }
  if (!Array.isArray(groups)) {
    return {
      validation: 'error',
      field: 'groups',
      message: `Format object must have field 'groups' of type array.`
    };
  }
  if (Array.isArray(groups) && groups.length === 0) {
    return {
      validation: 'error',
      field: 'groups',
      message: `Format object must have at least one element in the array field 'groups'.`
    };
  }
  if (separators.length >= groups.length) {
    return {
      field: 'separators',
      message: `Format object must not have 'separators' array with more elements than 'groups' array.`,
      validation: 'error'
    };
  }
  return {
    validation: 'success',
    data: {
      separators,
      groups,
      groupCount: groups.length
    }
  };
}

function hasEqualSumOfGroupsAndCouponLength(coupon, groupCount) {
  return coupon.length === groupCount;
}

module.exports = {
  hasValidCharacterInFormatRuleString,
  hasValidPropertiesInFormatRuleObject,
  hasEqualSumOfGroupsAndCouponLength
};
