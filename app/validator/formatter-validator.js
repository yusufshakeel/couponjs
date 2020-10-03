'use strict';

function sumOfGroupsCharacters(groups) {
  return groups.reduce((sum, size) => sum + size, 0);
}

function validateFormatRuleString(ruleString) {
  const isValidFormatRuleString = /^([x]+-?[x]*)*?x$/g.test(ruleString);
  if (isValidFormatRuleString) {
    const groups = ruleString.split('-').map(group => group.length);
    const totalCharactersInGroup = sumOfGroupsCharacters(groups);
    const separators = '-'.repeat(groups.length - 1).split('');
    return {
      validation: 'success',
      data: {
        groups,
        totalCharactersInGroup,
        separators
      }
    };
  }
  return {
    validation: 'error',
    field: 'format',
    message:
      'Invalid characters used in the format rule. Only x and - are allowed. And only one - inbetween like xxx-xxx.'
  };
}

function validateFormatRuleObject(ruleObject) {
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
  if (separators.length !== groups.length - 1) {
    return {
      field: 'separators',
      message: `Format object must have ${groups.length - 1} elements in 'separators' array.`,
      validation: 'error'
    };
  }
  return {
    validation: 'success',
    data: {
      separators,
      groups,
      totalCharactersInGroup: sumOfGroupsCharacters(groups)
    }
  };
}

function hasEqualSumOfGroupsAndCouponLength(coupon, totalCharactersInGroup) {
  return coupon.length === totalCharactersInGroup;
}

module.exports = {
  validateFormatRuleString,
  validateFormatRuleObject,
  hasEqualSumOfGroupsAndCouponLength
};
