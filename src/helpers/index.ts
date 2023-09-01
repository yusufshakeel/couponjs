/**
 * This will return an integer value between min and max both inclusive.
 * @param {number} min The starting integer value.
 * @param {number} max The ending integer value.
 * @returns {number} Random integer value between min and max both inclusive.
 */
export function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

/**
 * This will sum up the values.
 * @param {number[]} values
 * @returns {number}
 */
export function sumOf(values: number[]): number {
  return values.reduce((sum, size) => sum + size, 0);
}

/**
 * This will attach prefix to the coupon.
 * @param {string} prefix
 * @returns {function(string): string}
 */
export function attachPrefix(prefix = '') {
  return function (coupon: string): string {
    return `${prefix}${coupon}`;
  };
}

/**
 * This will attach suffix to the coupon.
 * @param {string} suffix
 * @returns {function(string): string}
 */
export function attachSuffix(suffix = '') {
  return function (coupon: string): string {
    return `${coupon}${suffix}`;
  };
}

/**
 * This will take in an array of operators to operate on a value.
 * @param {*} operators
 * @returns {function(*=): *}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pipe(operators: any[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (value: any) {
    return operators.reduce((enrichedValue, operator) => operator(enrichedValue), value);
  };
}

/**
 * This will return the first argument it receives.
 * @param {*} value
 * @returns {*}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function identity(value: any): any {
  return value;
}

/**
 * This will omit the specified values.
 * @param {string[]} values
 * @param {string[]} valuesToOmit
 * @returns {string[]}
 */
export function omit(values: string[], valuesToOmit: string[]): string[] {
  return values.filter(value => !valuesToOmit.includes(value));
}

/**
 * This will return unique characters array.
 * @param {string[]} characters
 * @returns {string[]}
 */
export function uniqueCharacters(characters: string[]): string[] {
  return [...new Set(characters.join(''))];
}

/**
 * Copies all enumerable own properties from one or more objects to an empty target object.
 * @param {...object} sourceObjects
 * @returns {object}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function shallowMerge(...sourceObjects: any[]): any {
  return Object.assign({}, ...sourceObjects);
}