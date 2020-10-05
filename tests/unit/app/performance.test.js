'use strict';

const Performance = require('../../../app/performance.js');

test('Should be able to return stats', () => {
  const performance = new Performance();
  performance.startTimer();
  performance.stopTimer();
  const result = performance.stats();
  expect(Object.keys(result)).toStrictEqual(['duration']);
  expect(Object.keys(result.duration)).toStrictEqual(['nano', 'micro', 'milli', 'second']);
});
