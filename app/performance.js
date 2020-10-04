'use strict';

const NS_PER_SEC = 1e9;

function Performance() {
  let startedAt = 0;
  let duration = 0;

  this.startTimer = () => {
    startedAt = process.hrtime();
  };

  this.stopTimer = () => {
    duration = process.hrtime(startedAt);
  };

  this.stats = () => {
    const nano = duration[0] * NS_PER_SEC + duration[1];
    return {
      duration: {
        nano,
        micro: nano / 1e3,
        milli: nano / 1e6,
        second: nano / 1e9
      }
    };
  };
}

module.exports = Performance;
