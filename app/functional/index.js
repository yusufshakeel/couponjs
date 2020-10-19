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

module.exports = { sumOf, attachPrefix, attachSuffix, pipe, identity };
