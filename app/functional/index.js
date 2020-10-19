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

module.exports = { sumOf, attachPrefix, attachSuffix };
