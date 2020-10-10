'use strict';

const isOfType = (operand, type) => typeof operand === type;
const isBoolean = value => typeof value === 'boolean';
const isObject = value => typeof value === 'object';
const isString = value => typeof value === 'string';
const isUndefined = value => typeof value === 'undefined';
const isInteger = value => Number.isInteger(value) && Number.isFinite(value) && `${value}`;
const isArray = value => Array.isArray(value);
const isEmptyArray = value => isArray(value) && value.length === 0;

module.exports = {
  isOfType,
  isUndefined,
  isInteger,
  isArray,
  isBoolean,
  isString,
  isObject,
  isEmptyArray
};
