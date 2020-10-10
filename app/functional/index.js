'use strict';

const isUndefined = operand => typeof operand === 'undefined';
const isOfType = (operand, type) => typeof operand === type;
const isInteger = value => Number.isInteger(value) && Number.isFinite(value) && `${value}`;
const isArray = value => Array.isArray(value);

module.exports = {
  isOfType,
  isUndefined,
  isInteger,
  isArray
};
