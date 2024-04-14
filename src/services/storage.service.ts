import GlobalData from '../entities/global-data.entity.js';
import TasksData from '../entities/tasks-data.entity.js';
import { eSignal } from '../entities/global.enum.js';
import Scheduler from './scheduler.service.js';
import sBrowser from './browser.service.js';
import TaskConfigData from '../entities/task-config-data.entity.js';

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
  };

  private constructor() {
    this.globalData = new GlobalData();
    this.tasksData = new TasksData();

    this.globalData.load();
    this.tasksData.load();
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

  setRefBrowser(ref: sBrowser) {
    this.refBrowser = ref;
  }

  getRefBrowser(): sBrowser {
    return this.refBrowser;
  }

  getEnabledTask(): TaskConfigData[] {
    return this.tasksData.getEnabledTask();
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
