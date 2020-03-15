# couponjs
This is a simple coupon creation project using NodeJS.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yusufshakeel/couponjs)
[![npm version](https://img.shields.io/badge/npm-0.7.0-blue.svg)](https://www.npmjs.com/package/couponjs)
[![Build Status](https://travis-ci.com/yusufshakeel/couponjs.svg?branch=master)](https://travis-ci.com/yusufshakeel/couponjs)

# Getting Started
Add this to your project using npm.
```
> npm i couponjs
```

Next, require `couponjs`.
```javascript
const Coupon = require('couponjs');
```

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

## Coupons using builtIn and custom characterSet
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
['95TMY9JV', 'RZU6ZL0K', '1Q19NY19']
```


## License
It's free :smiley:

[MIT License](https://github.com/yusufshakeel/couponjs/blob/master/LICENSE) Copyright (c) 2020 Yusuf Shakeel

### Back this project

If you find this project useful and interesting then feel free to support it on [Patreon](https://www.patreon.com/yusufshakeel).

### Donate
Feeling generous :smiley: [Donate via PayPal](https://www.paypal.me/yusufshakeel)