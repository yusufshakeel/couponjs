import { PerformanceType } from '../ts-def/performance-type';

export default class Performance {
  private startedAt = 0;
  private endedAt = 0;

  public startTimer() {
    this.startedAt = new Date().getTime();
  }

  public stopTimer() {
    this.endedAt = new Date().getTime();
  }

  public stats(): PerformanceType {
    const milli = this.endedAt - this.startedAt;
    return {
      duration: {
        nano: milli * 1e6,
        micro: milli * 1e3,
        milli,
        second: milli / 1e3
      }
    };
  }
}