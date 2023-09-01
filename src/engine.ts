import { attachSuffix, attachPrefix, pipe, identity } from './helpers';
import {
  validateLength,
  validateOmitCharacters,
  validateNumberOfCoupons,
  validatePrefix,
  validateSuffix,
  validateCharacterSetOption
} from './validators/generate-coupon-config-validator';
import {
  DEFAULT_LENGTH,
  DEFAULT_PREFIX,
  DEFAULT_SUFFIX,
  MAX_NUMBER_OF_COUPONS_TO_GENERATE,
  DEFAULT_NUMBER_OF_COUPONS_TO_GENERATE,
  DEFAULT_OMIT_CHARACTERS,
  DEFAULT_CHARACTER_SET_OPTION,
  UNDEFINED
} from './constants';
import Formatter from './formatter';
import characterList from './helpers/character-list';
import { EngineConstructorType, RandomIntegerFunctionType } from './ts-def/engine-type';
import { CharacterSetOptionsType } from './ts-def/option-type';
import { CouponResponseType } from './ts-def/coupon-response-type';

export default class Engine {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private formatter: any;
  private characterSetOption: CharacterSetOptionsType;
  private length: number;
  private prefix: string;
  private suffix: string;
  private numberOfCoupons: number;
  private maxNumberOfCouponsToGenerate: number;
  private charactersLength: number;
  private characters: string[];
  private randomInteger: RandomIntegerFunctionType;

  constructor({
    randomInteger,
    characterSetOption = DEFAULT_CHARACTER_SET_OPTION,
    length = DEFAULT_LENGTH,
    prefix = DEFAULT_PREFIX,
    suffix = DEFAULT_SUFFIX,
    numberOfCoupons = DEFAULT_NUMBER_OF_COUPONS_TO_GENERATE,
    omitCharacters = DEFAULT_OMIT_CHARACTERS,
    format = UNDEFINED,
    maxNumberOfCouponsToGenerate = MAX_NUMBER_OF_COUPONS_TO_GENERATE
  }: EngineConstructorType) {
    validatePrefix(prefix);
    validateSuffix(suffix);
    validateLength(length);
    validateOmitCharacters(omitCharacters);
    validateCharacterSetOption(characterSetOption);

    this.characters = characterList(characterSetOption, omitCharacters);
    this.charactersLength = this.characters.length;
    const totalNumberOfPossibleCoupons = Math.pow(this.charactersLength, length);

    validateNumberOfCoupons(
      numberOfCoupons,
      maxNumberOfCouponsToGenerate,
      totalNumberOfPossibleCoupons
    );

    this.randomInteger = randomInteger;
    this.length = length;
    this.prefix = prefix;
    this.suffix = suffix;
    this.numberOfCoupons = numberOfCoupons;
    this.characterSetOption = characterSetOption;
    this.maxNumberOfCouponsToGenerate = maxNumberOfCouponsToGenerate;
    this.formatter = format !== UNDEFINED ? new Formatter(format) : { format: identity };
  }

  private generateCoupon() {
    const generatedCouponCharacters = [];
    for (let i = 0; i < this.length; i++) {
      generatedCouponCharacters.push(
        (this.characters)[this.randomInteger(0, this.charactersLength - 1)]
      );
    }
    const coupon = generatedCouponCharacters.join('');
    return this.formatter.format(
      pipe([
        attachPrefix(this.prefix),
        attachSuffix(this.suffix)
      ])(coupon)
    );
  }

  private generateSingleCoupon(): string {
    return this.generateCoupon();
  }

  private generateMultipleCoupons(): string[] {
    const couponSet = new Set();
    while (couponSet.size < this.numberOfCoupons) {
      couponSet.add(this.generateCoupon());
    }
    return Array.from(couponSet) as string[];
  }

  public run(): CouponResponseType {
    if (this.numberOfCoupons === 1) {
      return this.generateSingleCoupon();
    }
    return this.generateMultipleCoupons();
  }
}