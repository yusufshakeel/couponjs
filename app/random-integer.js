/**
 * This will return an integer value between min and max both inclusive.
 * @param {number} min The minimum (starting) integer value.
 * @param {number} max The maximum (ending) integer value.
 * @returns {number} Random integer value between min and max both inclusive.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

module.exports = randomInteger;