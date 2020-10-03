# couponjs
This is a simple coupon creation project using NodeJS.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yusufshakeel/couponjs)
[![npm version](https://img.shields.io/badge/npm-0.8.1-blue.svg)](https://www.npmjs.com/package/couponjs)
[![Build Status](https://travis-ci.com/yusufshakeel/couponjs.svg?branch=master)](https://travis-ci.com/yusufshakeel/couponjs)
[![Coverage Status](https://coveralls.io/repos/github/yusufshakeel/couponjs/badge.svg?branch=master)](https://coveralls.io/github/yusufshakeel/couponjs?branch=master)

# Getting Started
Add this to your project using npm.
```
> npm i couponjs
```

Next, require `couponjs`.
```javascript
const Coupon = require('couponjs');
```

## Table of Contents

* [Getting Started](#getting-started)
* [Generate coupon](#generate-coupon)
* [Configurations](#configurations)
  * [Coupon of length N](#coupon-of-length-n)
  * [Coupon with prefix](#coupon-with-prefix)
  * [Coupon with suffix](#coupon-with-suffix)
  * [Coupon with prefix and suffix](#coupon-with-prefix-and-suffix)
  * [Coupon with built in character set](#coupon-with-built-in-character-set)
  * [Coupon with custom characterSet](#coupon-with-custom-characterset)
  * [Coupons using built in and custom character set](#coupons-using-built-in-and-custom-character-set)
  * [Generate multiple unique coupons](#generate-multiple-unique-coupons)
  * [Omit characters](#omit-characters)
  * [Format coupons](#format-coupons)
    * [String format rule](#string-format-rule)
    * [Object format rule](#object-format-rule)
  * [Format coupon with prefix and suffix](#format-coupon-with-prefix-and-suffix)
    * [String format rule and prefix-suffix combo](#string-format-rule-and-prefix-suffix-combo)
    * [Object format rule and prefix-suffix combo](#object-format-rule-and-prefix-suffix-combo)
* [License](#license)
* [Back this project](#back-this-project)
* [Donate](#donate)


## Generate coupon
Create an object.
```javascript
const coupon = new Coupon();
```

Now, call the `generate` method.
```javascript
const myCoupon = coupon.generate();
```
The above code will produce coupon like `ASDFGH`.

By default, `generate` will return coupon code of length 6 using uppercase alphabet.

## Configurations

We can pass different options to configure the engine to generate coupons as per our settings.

Eample:

```javascript
const myCoupon = coupon.generate({
  length: 8
});
```

Options that we can use are listed below.

## Coupon of length N
To generate coupon of a given length we pass the following option to the `generate` method.
```javascript
const myCoupon = coupon.generate({
  length: 8
});
```
Where, 8 in the above code represent the total number of characters that will be present in the coupon.

Range of `length`
* Min: 1
* Max: 128

If length is not passed then default value of 6 is considered.

## Coupon with prefix
To generate a coupon with a given prefix we pass the following option to the `generate` method.
```javascript
const myCoupon = coupon.generate({
  prefix: 'SUPER'
});
```
The above code will generate coupon with prefix 'SUPER'. Default lenght of the coupon is 6. So, we will get coupon like the following.

`SUPERAAAAAA`

Note! Prefix characters are not counted.

If we want to generate coupon of length 3 with prefix 'SUPER' then our option will look like the following.
```javascript
const myCoupon = coupon.generate({
  length: 3,
  prefix: 'SUPER'
});
```
We will get coupon like the following `SUPERAAA`.

## Coupon with suffix
To create coupon with suffix pass the following option.
```javascript
const myCoupon = coupon.generate({
  length: 3,
  suffix: 'AWESOME'
});
```
The above code will generate coupon like the following `ZZZAWESOME`.

Note! Characters of the suffix is not counted. If length is not specified then default value of 6 is considered as the length.

## Coupon with prefix and suffix
To create coupon with prefix and suffix pass the following option.
```javascript
const myCoupon = coupon.generate({
  length: 6,
  prefix: 'SUPER',
  suffix: 'AWESOME'
});
```
The above code will generate coupon like the following `SUPERZZZZZZAWESOME`.

Note! The characters of the prefix and suffix is not considered. If length is not specified then default value of 6 is considered.

## Coupon with built in character set
To create coupon code with built in character set pass the following option.
```javascript
const myCoupon = coupon.generate({
  characterSet: {
    builtIn: ['charSetName']
  }
});
```
Where, `charSetName` is any of the following

- `CHARSET_ALPHA` -- consists of uppercase alphabet characters `A-Z`
- `CHARSET_ALPHA_LOWER` -- consists of lowercase alphabet characters `a-z`
- `CHARSET_DIGIT` -- consists of digits `0-9`
- `CHARSET_ALNUM` -- consists of uppercase alphabet `A-Z`, lowercase alphabet `a-z` and digit `0-9`
- `CHARSET_BINARY` -- consists of characters `01`
- `CHARSET_OCTAL` -- consists of characters `01234567`
- `CHARSET_HEX` -- consists of characters `0-9` and `A-F`
- `CHARSET_HEX_LOWER` -- consists of characters `0-9` and `a-f`

Example: If we want uppercase and digit we can pass the following.
```javascript
const myCoupon = coupon.generate({
  characterSet: {
    builtIn: ['CHARSET_ALPHA', 'CHARSET_DIGIT']
  }
});
```

## Coupon with custom characterSet
To use custom characters to generate coupons pass the following option.
```javascript
const myCoupon = coupon.generate({
  characterSet: {
    custom: ['customChar']
  }
});
```
Where, `customChar` is any custom characters that you wish to use.

Example: To use `ABC`, `xyz` and `01234` in coupon pass the following.
```javascript
const myCoupon = coupon.generate({
  characterSet: {
    custom: ['ABC', 'xyz', '01234']
  }
});
```

## Coupons using built in and custom character set
Example: Following option will use digit `0-9` and alphabet `ABC`.
```javascript
const myCoupon = coupon.generate({
  characterSet: {
    builtIn: ['CHARSET_DIGIT'],
    custom: ['ABC']
  }
});
```

## Generate multiple unique coupons
Pass the following to generate multiple unqiue coupons.
```javascript
const myCoupons = coupon.generate({
  numberOfCoupons: number
});
```
The above code will return an array of coupons.

Where, `number` represents the total number of unique coupons to generate.

Range of `numberOfCoupons`

- Min 1
- Max 100000

Example:
Following code will generate 3 unique coupons of length 8 using builtIn `CHARSET_ALPHA` and `CHARSET_DIGIT` option.
```javascript
const myCoupons = coupon.generate({
  length: 8,
  numberOfCoupons: 3,
  characterSet: {
    builtIn: ['CHARSET_ALPHA', 'CHARSET_DIGIT']
  }
});
```

Sample output:
```
['95TMY9JV', 'RZU6ZL0K', '1Q19N019']
```

## Omit characters

To omit characters from the generated coupon code we pass the following option.

```javascript
const myCoupons = coupon.generate({
  omitCharacters: ['charToOmit']
});
```

Where, `omitCharacters` is the field that will help in omitting the characters.

`charToOmit` is a string of characters to omit from the generated coupon codes.

Example:

```javascript
const myCoupons = coupon.generate({
  omitCharacters: ['ABC', 'XYZ']
});
```

The above code will generate coupons that will omit characters `A`, `B`, `C`, `X`, `Y` and `Z`.

## Format coupons

We can format the coupons that are generated by the engine in two ways.

* [Using string rule](#string-format-rule)
* [Using object rule](#object-format-rule)

### String format rule

This is the quick and easy way to format the coupon.

Use `x`'s for coupon characters and `-`'s to separate them into groups.

Example:

In the following setup we want to generate total `3` coupons.
Each coupons will be formatted like `xxxx-xxxx-xxxx` where, `x`'s represents the coupon character
and `-`'s represent the separator. Length of each coupon code is 12.

Note! Total number of characters in the coupon code must be equal to the number of `x`'s in the format.

```javascript
const myCoupons = coupon.generate({
  format: 'xxxx-xxxx-xxxx',
  length: 12,
  numberOfCoupons: 3
});
```

Sample output:

```
['OHGP-DTMG-HINR', 'DKXN-ALFH-LOQX', 'TAFK-GVXJ-WMPR']
```

### Object format rule

This gives us more formatting options and looks like the following.

```
{
  separators: ['chars', 'chars', ...],
  groups: [size, size, ...]
}
```

Where, `separators` are the ones separating the coupon characters into groups.
And `groups` represents the size of each group.

`chars` represents the separator characters. It can be a single character or multiple characters like '-' or '##'. 

`size` represents the size of a group. It is an integer value greater than 0.

Note! Total number of elements in the `separators` array must be one less than the total number of elements
in the `groups` array.

Example:

In the following example we are generating `3` coupons each having `12` characters.

We are formatting the coupons into `4 groups` having 2, 4, 4, and 2 characters in that order.

And we are separating the
* 1st and 2nd group with `-`
* 2nd and 3rd group with `~`
* 3rd and 4th group with `-`

```javascript
const myCoupons = coupon.generate({
  format: {
    separators: ['-', '~', '-'],
    groups: [2, 4, 4, 2]
  },
  length: 12,
  numberOfCoupons: 3
});
```

```
['OH-GPDT~MGHI-NR', 'DK-XBCL~FHLO-QX', 'TA-FKGV~XJWM-PR']
```

## Format coupon with prefix and suffix

If we have prefix and suffix then we have to consider the total number of characters in them too while setting the format field.

### String format rule and prefix-suffix combo

Lets say we want to generate a coupon having 6 characters and also add prefix `QWERT` and suffix `ZXCVB` to it.

So, our configuration will look something like the following.

```javascript
const myCoupon = coupon.generate({
  length: 6,
  prefix: 'QWERT',
  suffix: 'ZXCVB'
});
```

On executing this we will get coupon code like
```
QWERTOWLZJHZXCVB
```

Note! Total number of characters in the generated coupon is `5+6+5`.
```
QWERT = 5 characters (prefix)
OWLZJH = 6 characters (generated coupon, as length is set to 6)
ZXCVB = 5 characters (suffix)
------------------------------
Total = 16 characters (coupon with prefix and suffix)
```

To format the above generated coupon with prefix and suffix we have to consider total 16 `x`'s.

In the following configuration we are formatting the coupon with prefix and suffix.

```javascript
const myCoupon = coupon.generate({
  length: 6,
  prefix: 'QWERT',
  suffix: 'ZXCVB',
  format: 'xxxx-xxxx-xxxx-xxxx'
});
```

On executing this we will get coupon code like
```
QWER-TOWL-ZJHZ-XCVB
```

### Object format rule and prefix-suffix combo

If we want to generate a coupon having 6 characters and attach prefix `QWERT` and suffix `ZXCVB` then our configuration
will look like the following.

```javascript
const myCoupon = coupon.generate({
  length: 6,
  prefix: 'QWERT',
  suffix: 'ZXCVB',
  format: {
    separators: ['-', '~', '-'],
    groups: [2, 6, 6, 2]
  }
});
```

We are formatting the coupon into `4 groups` having 2, 6, 6, and 2 characters in that order.

And we are separating the
* 1st and 2nd group with `-`
* 2nd and 3rd group with `~`
* 3rd and 4th group with `-`

And we can add the following `format` configuration to get formatted coupon.

On executing this we will get coupon code like
```
QW-ERTOWL~ZJHZXC-VB
```

## License
It's free :smiley:

[MIT License](https://github.com/yusufshakeel/couponjs/blob/master/LICENSE) Copyright (c) 2020 Yusuf Shakeel

### Back this project

If you find this project useful and interesting then feel free to support it on [Patreon](https://www.patreon.com/yusufshakeel).

### Donate
Feeling generous :smiley: [Donate via PayPal](https://www.paypal.me/yusufshakeel)
