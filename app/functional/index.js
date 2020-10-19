'use strict';

/**
 * This will sum up the values.
 * @param {number[]} values
 * @returns {number}
 */
const sumOf = values => values.reduce((sum, size) => sum + size, 0);

module.exports = { sumOf };
