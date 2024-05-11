export function isOfType(operand: unknown, type: string): boolean {
  return typeof operand === type;
}

export function isBoolean(value: unknown): boolean {
  return typeof value === 'boolean';
}

export function isObject(value: unknown): boolean {
  return typeof value === 'object' && value !== null && value.constructor === Object;
}

export function isString(value: unknown): boolean {
  return typeof value === 'string';
}

export function isUndefined(value: unknown): boolean {
  return typeof value === 'undefined';
}

export function isInteger(value: unknown): boolean {
  return Number.isInteger(value) && Number.isFinite(value);
}

export function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

export function isEmptyArray(value: unknown): boolean {
  return isArray(value) && (value as Array<unknown>).length === 0;
}
