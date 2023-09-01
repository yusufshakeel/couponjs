// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isOfType(operand: any, type: string): boolean {
  return typeof operand === type;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBoolean(value: any): boolean {
  return typeof value === 'boolean';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null && value.constructor === Object;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isString(value: any): boolean {
  return typeof value === 'string';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isUndefined(value: any): boolean {
  return typeof value === 'undefined';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isInteger(value: any): boolean {
  return Number.isInteger(value) && Number.isFinite(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isArray(value: any): boolean {
  return Array.isArray(value);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEmptyArray(value: any): boolean {
  return isArray(value) && value.length === 0;
}