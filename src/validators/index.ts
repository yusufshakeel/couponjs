export function isOfType(operand: any, type: string): boolean {
  return typeof operand === type;
}

export function isBoolean(value: any): boolean {
  return typeof value === 'boolean';
}

export function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null && value.constructor === Object;
}

export function isString(value: any): boolean {
  return typeof value === 'string';
}

export function isUndefined(value: any): boolean {
  return typeof value === 'undefined';
}

export function isInteger(value: any): boolean {
  return Number.isInteger(value) && Number.isFinite(value);
}

export function isArray(value: any): boolean {
  return Array.isArray(value);
}

export function isEmptyArray(value: any): boolean {
  return isArray(value) && value.length === 0;
}