import { PerformanceType } from '../ts-def/helpers/performance-type';

const NS_PER_SEC = 1e9;

export default class Performance {
  private startedAt: [number, number] = [0, 0];
  private duration: [number, number] = [0, 0];

  public startTimer() {
    this.startedAt = process.hrtime();
  }

  public stopTimer() {
    this.duration = process.hrtime(this.startedAt);
  }

  public stats(): PerformanceType {
    const nano = (this.duration)[0] * NS_PER_SEC + (this.duration)[1];
    return {
      duration: {
        nano,
        micro: nano / 1e3,
        milli: nano / 1e6,
        second: nano / 1e9
      }
    };
  }
}