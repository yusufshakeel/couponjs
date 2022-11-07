export type CharacterSetOptionsType = {
  builtIn?: string[],
  custom?: string[]
};

export type OmitCharactersType = string[];

export type OptionType = {
  defaultCouponEngineOption: {
    verbose: boolean,
    logPerformance: boolean,
    maxNumberOfCouponsToGenerate: number
  },
  defaultCouponGenerationOption: {
    length: number,
    prefix: string,
    suffix: string,
    characterSet: CharacterSetOptionsType,
    numberOfCoupons: number,
    omitCharacters: OmitCharactersType,
    format: string
  }
};