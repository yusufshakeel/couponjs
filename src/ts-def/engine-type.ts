import { CharacterSetOptionsType, OmitCharactersType } from './option-type';
import { FormatRuleObjectType } from './format-rule-type';

// eslint-disable-next-line no-unused-vars
export type RandomIntegerFunctionType = (min: number, max: number) => number;

export type EngineConstructorType = {
  randomInteger: RandomIntegerFunctionType,
  characterSetOption?: CharacterSetOptionsType,
  length?: number,
  prefix?: string,
  suffix?: string,
  numberOfCoupons?: number,
  omitCharacters?: OmitCharactersType,
  format?: string | FormatRuleObjectType,
  maxNumberOfCouponsToGenerate?: number
}