# couponjs
This is a simple coupon creation project using NodeJS.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yusufshakeel/couponjs)
[![npm version](https://img.shields.io/badge/npm-0.2.0-blue.svg)](https://www.npmjs.com/package/couponjs)
[![Build Status](https://travis-ci.com/yusufshakeel/couponjs.svg?branch=master)](https://travis-ci.com/yusufshakeel/couponjs)

# Getting Started
Add this to your project using npm.
```
> npm i couponjs
```

## Tests
Test code of this project is inside the `tests` directory.

Using the following for testing:
* Jest

## Generate coupon
Create an object of Coupon.
```javascript
const Coupon = require('couponjs');

const coupon = new Coupon();
```

Now, call the `generate` method.
```javascript
const myCoupon = coupon.generate();
```

By default, `generate` will return coupon code of length 6 using uppercase alphabet.

### Coupon of length N
To generate coupon of a given length we pass the following option to the `generate` method.
```javascript
const myCoupon = coupon.generate({
  length: 8
});
```
Where, 8 in the above code represent the total number of characters that will be present in the coupon.


## License
It's free :smiley:

[MIT License](https://github.com/yusufshakeel/couponjs/blob/master/LICENSE) Copyright (c) 2020 Yusuf Shakeel

### Back this project

If you find this project useful and interesting then feel free to support it on [Patreon](https://www.patreon.com/yusufshakeel).

### Donate
Feeling generous :smiley: [Donate via PayPal](https://www.paypal.me/yusufshakeel)