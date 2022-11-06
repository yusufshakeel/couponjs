import Performance from '../../../src/helpers/performance';

describe('Testing Performance', () => {
  test('Should be able to return stats', () => {
    const performance = new Performance();
    performance.startTimer();
    performance.stopTimer();
    const result = performance.stats();
    expect(result).toStrictEqual({
      duration: {
        nano: expect.any(Number),
        micro: expect.any(Number),
        milli: expect.any(Number),
        second: expect.any(Number)
      }
    });
  });
});