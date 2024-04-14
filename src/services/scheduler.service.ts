import { cronToTimestamp } from '../utils/cronTimestamp.js';
import ITaskQueueItem from '../entities/ientities/itask-queue-item.entity.js';
import Store from './storage.service.js';
import { eMainState } from '../entities/global.enum.js';
import envConfig from '../config/env.config.js';
import ITask from '../entities/ientities/itask.entity.js';

class Scheduler {
  taskQueue: ITaskQueueItem[] = [];
  currentTaskInstance?: ITask;
  mainState: eMainState = eMainState.NONE;
  stateMachineHandle?: NodeJS.Timeout;

  constructor() {}

  init() {
    this.updateTaskQueue();
  }

  updateTaskQueue() {
    const localStore = Store.getStore();
    const enabledTasks = localStore.getEnabledTask();
    enabledTasks.forEach((enabledTask) => {
      const res = this.taskQueue.filter((task) => task.id === enabledTask.id);
      if (res.length === 0) {
        const newTaskInstance: ITaskQueueItem = {
          name: enabledTask.name,
          id: enabledTask.id,
          priority: enabledTask.priority,
          execTime: cronToTimestamp(enabledTask.cron),
        };
        this.taskQueue.push(newTaskInstance);
      }
    });
    this.taskQueue = this.taskQueue.sort(
      (a, b) =>
        a.execTime.getTime() - b.execTime.getTime() || b.priority - a.priority
    );
  }
}

export default Scheduler;
