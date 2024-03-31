import GlobalData from '../entities/global-data.entity.js';
import TasksData from '../entities/tasks-data.entity.js';
import { signal } from '../entities/global.enum.js';

class Store {
  private static instance: Store;
  private globalData: GlobalData;
  private tasksData: TasksData;
  private signalState = {
    [signal.PIDFILE]: false,
    [signal.GLOBALSAVEFILE]: false,
    [signal.TASKSSAVEFILE]: false,
  };

  private constructor() {
    this.globalData = new GlobalData();
    this.tasksData = new TasksData();

    this.globalData.load();
    this.tasksData.load();
  }

  static getStore(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  setSignalState(event: signal) {
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
