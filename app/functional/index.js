'use strict';

const isUndefined = operand => typeof operand === 'undefined';
const isOfType = (operand, type) => typeof operand === type;
const isInteger = operand => Number.isInteger(operand) && Number.isFinite(operand) && `${operand}`;

module.exports = {
  isOfType,
  isUndefined,
  isInteger
};
