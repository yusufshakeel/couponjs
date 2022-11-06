export type characterSetOptionsType = {
  builtIn?: string[],
  custom?: string[] | []
};

export type omitCharactersType = string[] | [];

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
    characterSet: characterSetOptionsType,
    numberOfCoupons: number,
    omitCharacters: omitCharactersType,
    format: string
  }
};