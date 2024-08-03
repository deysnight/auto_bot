export type cTimeout = number;

abstract class Interval {
  private static asyncIntervals: boolean[] = [];

  private static async runAsyncInterval(
    cb: Function,
    interval: number,
    intervalIndex: number
  ) {
    await cb();
    if (this.asyncIntervals[intervalIndex]) {
      setTimeout(
        () => this.runAsyncInterval(cb, interval, intervalIndex),
        interval
      );
    }
  }

  public static setAsyncInterval(cb: Function, interval: number): cTimeout {
    if (cb && typeof cb === 'function') {
      const intervalIndex = Interval.asyncIntervals.length;
      Interval.asyncIntervals.push(true);
      Interval.runAsyncInterval(cb, interval, intervalIndex);
      return intervalIndex;
    } else {
      throw new Error('Callback must be a function');
    }
  }

  public static clearAsyncInterval(intervalIndex: number): void {
    if (Interval.asyncIntervals[intervalIndex]) {
      Interval.asyncIntervals[intervalIndex] = false;
    }
  }
}

export const setAsyncInterval = Interval.setAsyncInterval;
export const clearAsyncInterval = Interval.clearAsyncInterval;
