export type FormatRuleObjectType = {
  separators: string[],
  groups: number[]
};

export type FormatRuleObjectReturnType = {
  separators: string[]
  groups: number[],
  totalCharactersInGroup: number,
};

export type ErrorType = {
  field: string,
  message: string,
  type: string
};

export type SeparatorErrorType = [] | ErrorType[];

export type GroupErrorType = [] | ErrorType[];