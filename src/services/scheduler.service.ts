import { cronToTimestamp } from '../utils/cronTimestamp.js';
import ITaskQueueItem from '../entities/ientities/itask-queue-item.entity.js';
import Store from './storage.service.js';
import { eMainState, eUpdateTaskEventWS } from '../entities/global.enum.js';
import envConfig from '../config/env.config.js';
import ITask from '../entities/ientities/itask.entity.js';
import { eStatsLabel } from '../entities/global.enum.js';
import WSS from './socket.service.js';
import randomIntFromInterval from '../utils/randomInt.js';

class Scheduler {
  taskQueue: ITaskQueueItem[] = [];
  currentTaskInstance?: ITask;
  mainState: eMainState = eMainState.NONE;
  stateMachineHandle?: NodeJS.Timeout;
  currenttasktargetedDelay?: number;
  currenttaskcurrentDelay?: number;
  startExecutionTime: Date = new Date(0);

  constructor() {}

  init() {
    this.updateTaskQueue();
  }

  updateTaskQueue(previousTaskId?: string) {
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

    if (this.taskQueue.length) {
      const wss = WSS.getWS();

      if (previousTaskId) {
        wss.emitUpdateTaskStatus(
          previousTaskId,
          eUpdateTaskEventWS.taskNextExec,
          this.getQueuedTaskExecTime(previousTaskId)?.execTime
        );
      }
      wss.emitUpdateTaskStatus(
        this.taskQueue[0].id,
        eUpdateTaskEventWS.nextTask
      );
    }

    console.log(
      this.taskQueue.map((item) => {
        return {
          name: item.name,
          execTime: item.execTime,
          prio: item.priority,
        };
      })
    );
  }

  onTaskSettingsUpdate(id: string) {
    const curr = this.getCurrentTask();
    if (!curr || curr.id === id) {
      return;
    }

    const res = this.removeTaskById(id);
    if (res !== true) this.updateTaskQueue();
  }

  onTaskEnable(id: string) {
    const curr = this.getCurrentTask();
    if ((!curr || curr.id === id) && this.mainState !== eMainState.IDLE) {
      return;
    }

    this.removeTaskById(id);
    this.updateTaskQueue();
  }

  removeTaskById(id: string): boolean {
    const index = this.taskQueue.findIndex((item) => item.id === id);
    if (index === -1) return false;
    this.taskQueue.splice(index, 1);
    return true;
  }

  getCurrentTask(): ITaskQueueItem {
    return this.taskQueue.at(0)!;
  }

  removeCurrentTask(): void {
    this.taskQueue.shift();
  }

  changeState(newState: eMainState) {
    this.mainState = newState;
    console.log(
      `[Scheduler] State machine switched to ${eMainState[newState]}`
    );
  }

  getQueuedTaskExecTime(taskId: string): ITaskQueueItem | undefined {
    return this.taskQueue.find((item) => item.id === taskId);
  }

  startMainLoop() {
    if (this.mainState !== eMainState.NONE) {
      return;
    }
    this.changeState(eMainState.IDLE);

    this.stateMachineHandle = setInterval(async () => {
      await this.stateMachine();
    }, 1000);
    console.log('[Scheduler] State machine started');
  }

  stopMainLoop() {
    if (this.mainState === eMainState.NONE) {
      return;
    }
    clearInterval(this.stateMachineHandle);
    this.changeState(eMainState.NONE);
    console.log('[Scheduler] State machine stopped');
  }

  autoMainLoop() {
    if (this.mainState !== eMainState.NONE) {
      return;
    }
    if (envConfig.scheduler.autostart) {
      console.log('[Scheduler] State machine auto start');
      this.startMainLoop();
    }
  }

  async processStateIdle() {
    if (
      this.getCurrentTask() &&
      this.getCurrentTask().execTime.getTime() <= Date.now()
    ) {
      this.changeState(eMainState.INIT);
    }
  }

  async processStateInit() {
    const taskConstructor = Store.getStore().getTaskConstructor(
      this.getCurrentTask().id
    );
    this.currentTaskInstance = new taskConstructor();
    this.startExecutionTime = new Date();

    const wss = WSS.getWS();
    wss.emitUpdateTaskStatus(
      this.getCurrentTask().id,
      eUpdateTaskEventWS.startTask,
      this.startExecutionTime
    );
    if (this.taskQueue.length > 1) {
      wss.emitUpdateTaskStatus(
        this.taskQueue[1].id,
        eUpdateTaskEventWS.nextTask
      );
    }

    this.changeState(eMainState.WAITINGDELAY);
  }

  async processStateClean() {
    const id = this.getCurrentTask().id;
    const store = Store.getStore();
    const endExecutionTime = new Date();

    let execCount = store.getTaskStats(
      id,
      eStatsLabel.executionCount
    ) as number;
    const execTime =
      (endExecutionTime.getTime() - this.startExecutionTime.getTime()) / 1000;
    const oldAvgExecTime = store.getTaskStats(
      id,
      eStatsLabel.averageExecutionTime
    ) as number;

    execCount++;
    const newAvgExecTime =
      oldAvgExecTime + (execTime - oldAvgExecTime) / execCount;

    store.setTaskStats(id, eStatsLabel.executionCount, execCount);
    store.setTaskStats(id, eStatsLabel.averageExecutionTime, newAvgExecTime);
    store.setTaskStats(id, eStatsLabel.lastExecution, endExecutionTime);

    this.removeCurrentTask();
    this.updateTaskQueue(id);

    WSS.getWS().emitUpdateTaskStatus(
      id,
      eUpdateTaskEventWS.endTask,
      this.startExecutionTime
    );

    this.changeState(eMainState.IDLE);
  }

  async processStateWaitingDelay() {
    if (this.currenttasktargetedDelay === undefined) {
      const taskDelay = Store.getStore().getTaskDelay(this.getCurrentTask().id);
      if (taskDelay.enabled) {
        this.currenttasktargetedDelay = randomIntFromInterval(
          taskDelay.minDelay,
          taskDelay.maxDelay
        );
        this.currenttaskcurrentDelay = 0;
      } else {
        this.changeState(eMainState.TASKINIT);
      }
    } else {
      if (this.currenttaskcurrentDelay! > this.currenttasktargetedDelay) {
        this.currenttasktargetedDelay = undefined;
        this.currenttaskcurrentDelay = undefined;
        this.changeState(eMainState.TASKINIT);
      } else {
        this.currenttaskcurrentDelay!++;
      }
    }
  }

  async processStateTaskInit() {
    await this.currentTaskInstance!.init();
    this.changeState(eMainState.TASKEXEC);
  }

  async processStateTaskExec() {
    await this.currentTaskInstance!.run();
    this.changeState(eMainState.TASKEND);
  }

  async processStateTaskEnd() {
    await this.currentTaskInstance!.afterRun();
    this.changeState(eMainState.CLEAN);
  }

  async stateMachine() {
    try {
      // if (this.taskQueue.length === 0) return;

      switch (this.mainState) {
        case eMainState.IDLE:
          await this.processStateIdle();
          break;
        case eMainState.INIT:
          await this.processStateInit();
          break;
        case eMainState.CLEAN:
          await this.processStateClean();
          break;
        case eMainState.WAITINGDELAY:
          await this.processStateWaitingDelay();
          break;
        case eMainState.TASKINIT:
          await this.processStateTaskInit();
          break;
        case eMainState.TASKEXEC:
          await this.processStateTaskExec();
          break;
        case eMainState.TASKEND:
          await this.processStateTaskEnd();
          break;
        default:
          console.log('[Scheduler] State machine unknown state error');
          process.exit(1);
          break;
      }
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }
}

export default Scheduler;
