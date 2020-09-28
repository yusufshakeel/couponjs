'use strict';

/**
 * This will return an integer value between min and max both inclusive.
 * @param {number} min The starting integer value.
 * @param {number} max The ending integer value.
 * @returns {number} Random integer value between min and max both inclusive.
 */
const randomInteger = (min, max) =>
  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

module.exports = randomInteger;
