import { FormatRuleObjectType } from './format-rule-type';

export type CharacterSetOptionsType = {
  builtIn?: string[],
  custom?: string[]
};

export type OmitCharactersType = string[];

export type CouponEngineOptionType = {
  verbose?: boolean,
  logPerformance?: boolean,
  maxNumberOfCouponsToGenerate?: number
};

export type CouponGenerationOptionType = {
  length?: number,
  prefix?: string,
  suffix?: string,
  characterSet?: CharacterSetOptionsType,
  numberOfCoupons?: number,
  omitCharacters?: OmitCharactersType,
  format?: string | FormatRuleObjectType
};

export type OptionType = {
  defaultCouponEngineOption: CouponEngineOptionType,
  defaultCouponGenerationOption: CouponGenerationOptionType
};