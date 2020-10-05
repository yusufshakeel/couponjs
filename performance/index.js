'use strict';

const CouponJS = require('../index.js');

const maxCoupons = [1, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 5e6];

const couponLengths = [6, 8, 12, 16];

const roundNumbers = [1, 2, 3];

maxCoupons.forEach(maxCoupon => {
  const coupon = new CouponJS({
    verbose: true,
    logPerformance: true,
    maxNumberOfCouponsToGenerate: maxCoupon
  });
  couponLengths.forEach(couponLength => {
    let performances = [];
    roundNumbers.forEach(round => {
      console.info(`============================================================`);
      const result = coupon.generate({
        characterSet: { builtIn: ['CHARSET_ALNUM'] },
        length: couponLength,
        numberOfCoupons: maxCoupon
      });
      performances.push(result.performance);
      console.info(
        `#${round}: Time: ${new Date().toISOString()} Total Coupons: ${maxCoupon}, Coupon Length: ${couponLength}, Duration: ${
          result.performance.duration.nano
        }n`
      );
    });
    const nanoAvg =
      performances.reduce((sum, currentPerformance) => sum + currentPerformance.duration.nano, 0) /
      roundNumbers.length;
    const stats = {
      averageDuration: {
        nano: nanoAvg,
        micro: nanoAvg / 1e3,
        milli: nanoAvg / 1e6,
        second: nanoAvg / 1e9
      }
    };
    console.info(`============================================================`);
    console.info(`Performance:\n${JSON.stringify(stats, null, 2)}`);
  });
});
