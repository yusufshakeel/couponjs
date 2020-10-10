'use strict';

const startSection = data => {
  return `# PERFORMANCE

This file contains the performance log.

Generated at: ${data.timestamp}

You can run the following command to see fresh logs on your machine.

\`\`\`
> npm run performance
\`\`\`

### Settings

\`\`\`javascript
const coupon = new CouponJS({
  verbose: true,
  logPerformance: true,
  maxNumberOfCouponsToGenerate: maxCoupon
});

const result = coupon.generate({
  characterSet: { builtIn: ['CHARSET_ALNUM'] },
  length: couponLength,
  numberOfCoupons: maxCoupon
});
\`\`\`

More details in this file:

\`\`\`
performance/index.js
\`\`\`
`;
};

module.exports = { startSection };
