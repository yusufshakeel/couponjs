'use strict';

/**
 * This will sum up the values.
 * @param {number[]} values
 * @returns {number}
 */
const sumOf = values => values.reduce((sum, size) => sum + size, 0);

/**
 * This will attach prefix to the coupon.
 * @param {string} prefix
 * @returns {function(string): string}
 */
const attachPrefix = (prefix = '') => coupon => `${prefix}${coupon}`;

/**
 * This will attach suffix to the coupon.
 * @param {string} suffix
 * @returns {function(string): string}
 */
const attachSuffix = (suffix = '') => coupon => `${coupon}${suffix}`;

/**
 * This will take in an array of operators to operate on a value.
 * @param {*} operators
 * @returns {function(*=): *}
 */
const pipe = operators => value =>
  operators.reduce((enrichedValue, operator) => operator(enrichedValue), value);

/**
 * This will return the first argument it receives.
 * @param {*} value
 * @returns {*}
 */
const identity = value => value;

/**
 * This will omit the specified values.
 * @param {string[]} values
 * @param {string[]} valuesToOmit
 * @returns {string[]}
 */
const omit = (values, valuesToOmit) => values.filter(value => !valuesToOmit.includes(value));

/**
 * This will return unique characters array.
 * @param {string[]} characters
 * @returns {string[]}
 */
const uniqueCharacters = characters => [...new Set(characters.join(''))];

/**
 * Copies all enumerable own properties from one or more objects to a empty target object.
 * @param {...object} sourceObjects
 * @returns {object}
 */
const shallowMerge = (...sourceObjects) => Object.assign({}, ...sourceObjects);

module.exports = {
  sumOf,
  attachPrefix,
  attachSuffix,
  pipe,
  identity,
  omit,
  uniqueCharacters,
  shallowMerge
};
