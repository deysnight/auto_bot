import { eStatsLabel } from '../entities/global.enum.js';
import Store from '../services/storage.service.js';

abstract class IVars {
  /**
   * Get task execution count.
   */
  static getStatExecCount(): number {
    const store = Store.getStore();
    const taskId = store.getRunningTask();

    return store.getTaskStats(taskId, eStatsLabel.executionCount) as number;
  }

  /**
   * Get task average execution time in seconde.
   */
  static getStatAvgExecTime(): number {
    const store = Store.getStore();
    const taskId = store.getRunningTask();

    return store.getTaskStats(
      taskId,
      eStatsLabel.averageExecutionTime
    ) as number;
  }

  /**
   * Get task last execution date.
   */
  static getStatLastExec(): Date {
    const store = Store.getStore();
    const taskId = store.getRunningTask();

    return store.getTaskStats(taskId, eStatsLabel.lastExecution) as Date;
  }

  /**
   * Get list of internal task variables name.
   */
  static getVarList(): string[] {
    const store = Store.getStore();
    const taskId = store.getRunningTask();

    return store.getTaskIntervalVarList(taskId);
  }

  /**
   * Get internal task variable value.
   */
  static getVar(varName: string): string | number | undefined {
    const store = Store.getStore();
    const taskId = store.getRunningTask();

    return store.getTaskInternalVar(taskId, varName);
  }

  /**
   * Create internal task variable and set to the given value.
   *
   * No effect if the variable already exist.
   */
  static createVar(varName: string, varValue: string | number): void {
    const store = Store.getStore();
    const taskId = store.getRunningTask();

    if (store.getTaskInternalVar(taskId, varName) === undefined) {
      store.setTaskInternalVar(taskId, varName, varValue);
    }
  }

  /**
   * Set internal task variable to the given value.
   *
   * Will create the variable if not existing.
   */
  static setVar(varName: string, varValue: string | number): void {
    const store = Store.getStore();
    const taskId = store.getRunningTask();

    store.setTaskInternalVar(taskId, varName, varValue);
  }
}

export default IVars;
