import GlobalData from '../entities/global-data.entity.js';
import TasksData from '../entities/tasks-data.entity.js';
import { ePriority, eSignal } from '../entities/global.enum.js';
import Scheduler from './scheduler.service.js';
import sBrowser from './browser.service.js';
import TaskConfigData from '../entities/task-config-data.entity.js';
import Task, { Type } from '../entities/task.entity.js';
import IDelay from '../entities/ientities/idelay.entity.js';
import { eStatsLabel } from '../entities/global.enum.js';

class Store {
  private static instance: Store;
  private refScheduler!: Scheduler;
  private refBrowser!: sBrowser;
  private globalData: GlobalData;
  private tasksData: TasksData;
  private signalState = {
    [eSignal.PIDFILE]: false,
    [eSignal.GLOBALSAVEFILE]: false,
    [eSignal.TASKSSAVEFILE]: false,
    [eSignal.BROWSER]: false,
  };

  private constructor() {
    this.globalData = new GlobalData();
    this.tasksData = new TasksData();

    this.globalData.load();
    this.tasksData.load();
    this.globalData.updateGlobalTaskId();
    this.tasksData.updateTasksMap();
  }

  static getStore(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  setRefScheduler(ref: Scheduler) {
    this.refScheduler = ref;
  }

  getRefScheduler(): Scheduler {
    return this.refScheduler;
  }

  setRefBrowser(ref: sBrowser): void {
    this.refBrowser = ref;
  }

  getRefBrowser(): sBrowser {
    return this.refBrowser;
  }

  getAllTaskConfigData(): TaskConfigData[] {
    return this.tasksData.getAllTaskConfigData();
  }

  getEnabledTask(): TaskConfigData[] {
    return this.tasksData.getEnabledTask();
  }

  getTaskConstructor(id: string): Type<Task> {
    return this.tasksData.getTaskConstructor(id);
  }

  getTaskName(id: string): string {
    return this.tasksData.getTaskName(id);
  }

  getTaskCron(id: string): string {
    return this.tasksData.getTaskCron(id);
  }

  getTaskPriority(id: string): ePriority {
    return this.tasksData.getTaskPriority(id);
  }

  getTaskDelay(id: string): IDelay {
    return this.tasksData.getTaskDelay(id);
  }

  getTaskStats(id: string, varName: eStatsLabel): number | Date {
    return this.tasksData.getTaskStats(id, varName);
  }

  setTaskStats(id: string, varName: eStatsLabel, value: number | Date): void {
    this.tasksData.setTaskStats(id, varName, value);
  }

  getTaskIntervalVarList(id: string): string[] {
    return this.tasksData.getTaskIntervalVarList(id);
  }

  getTaskInternalVar(id: string, varName: string): string | number | undefined {
    return this.tasksData.getTaskInternalVar(id, varName);
  }

  setTaskInternalVar(
    id: string,
    varName: string,
    value: string | number
  ): void {
    this.tasksData.setTaskInternalVar(id, varName, value);
  }

  deleteTaskInternalVar(id: string, varName: string): void {
    this.tasksData.deleteTaskInternalVar(id, varName);
  }

  setSignalState(event: eSignal) {
    this.signalState[event] = true;
    console.log(`${event} sema released`);

    const released = Object.values(this.signalState).every(
      (value: boolean) => value === true
    );

    if (released === true) {
      console.log(`all sema released, exit`);
      process.exit();
    }
  }
}

export default Store;
