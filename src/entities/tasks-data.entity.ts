import path from 'path';
import ITasksData from './ientities/itasks-data.entity.js';
import TaskConfigData from './task-config-data.entity.js';
import TaskInternalData from './task-internal-data.entity.js';
import envConfig from '../config/env.config.js';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { ePriority, eSignal, eSignalExit } from './global.enum.js';
import Tasks from '../../tasks/index.js';
import { simpleHash } from '../utils/simpleHash.js';
import Task, { Type } from './task.entity.js';
import IDelay from './ientities/idelay.entity.js';
import { eStatsLabel } from './global.enum.js';

class TasksData implements ITasksData {
  private defaultTasksSaveFile: string = path.join(
    path.resolve(),
    'tasks_data.sophon'
  );

  taskConfigData: TaskConfigData[] = [];
  taskInternalData: TaskInternalData[] = [];

  constructor() {
    process.on(eSignalExit, () => this.save());
  }

  load(): void {
    try {
      const filePath =
        envConfig.scheduler.tasksSaveFile || this.defaultTasksSaveFile;
      if (!existsSync(filePath)) {
        return;
      }
      const tmpLoaded = JSON.parse(
        readFileSync(filePath, 'utf-8')
      ) as ITasksData;
      this.taskConfigData = tmpLoaded.taskConfigData;
      this.taskInternalData = tmpLoaded.taskInternalData;
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  save(): void {
    const filePath =
      envConfig.scheduler.tasksSaveFile || this.defaultTasksSaveFile;
    const tmpToSave = {
      taskConfigData: this.taskConfigData,
      taskInternalData: this.taskInternalData,
    } as ITasksData;

    writeFileSync(filePath, JSON.stringify(tmpToSave), { flag: 'w+' });
    (process.emit as Function)(eSignal.TASKSSAVEFILE);
  }

  getAllTaskConfigData(): TaskConfigData[] {
    return this.taskConfigData;
  }

  getTaskConfigData(taskName: string): TaskConfigData | undefined {
    const currentTask = this.taskConfigData.filter(
      (item) => item.name === taskName
    );
    if (!currentTask.length) {
      return undefined;
    }
    return currentTask.at(0);
  }

  addTaskConfigData(newTaskConfigData: TaskConfigData): void {
    this.taskConfigData.push(newTaskConfigData);
  }

  addTaskInternalData(newTaskInternalData: TaskInternalData): void {
    this.taskInternalData.push(newTaskInternalData);
  }

  getEnabledTask(): TaskConfigData[] {
    return this.taskConfigData.filter((item) => item.enabled === true);
  }

  getTaskConstructor(id: string): Type<Task> {
    const task = this.taskConfigData.find((item) => item.id === id);
    return task!.handle;
  }

  getTaskDelay(id: string): IDelay {
    const task = this.taskConfigData.find((item) => item.id === id);
    return task!.delay;
  }

  getTaskName(id: string): string {
    const task = this.taskConfigData.find((item) => item.id === id);
    return task!.name;
  }

  getTaskCron(id: string): string {
    const task = this.taskConfigData.find((item) => item.id === id);
    return task!.cron;
  }

  getTaskPriority(id: string): ePriority {
    const task = this.taskConfigData.find((item) => item.id === id);
    return task!.priority;
  }

  getTaskStats(id: string, varName: eStatsLabel): number | Date {
    const task = this.taskInternalData.find((item) => item.id === id);
    return (task!.statistics as any)[eStatsLabel[varName]];
  }

  setTaskStats(id: string, varName: eStatsLabel, value: number | Date): void {
    const task = this.taskInternalData.find((item) => item.id === id);
    (task!.statistics as any)[eStatsLabel[varName]] = value;
  }

  getTaskIntervalVarList(id: string): string[] {
    const task = this.taskInternalData.find((item) => item.id === id);
    return task!.internals.map((item) => item.name);
  }

  getTaskInternalVar(id: string, varName: string): string | number | undefined {
    const task = this.taskInternalData.find((item) => item.id === id);
    return task!.internals.find((item) => item.name === varName)?.value;
  }

  setTaskInternalVar(
    id: string,
    varName: string,
    value: string | number
  ): void {
    const task = this.taskInternalData.find((item) => item.id === id)!;
    const index = task!.internals.findIndex((item) => item.name === varName);

    if (index === -1) {
      task.internals.push({ name: varName, value: value });
    } else {
      task.internals.at(index)!.value = value;
    }
  }

  updateTasksMap(): void {
    Tasks.forEach((_task) => {
      const wantedTaskName = (_task as any).taskName;
      const tmp = this.getTaskConfigData(wantedTaskName);
      if (tmp) {
        tmp.handle = _task;
      } else {
        const newTaskConfigData = new TaskConfigData();
        newTaskConfigData.handle = _task;
        newTaskConfigData.name = wantedTaskName;
        newTaskConfigData.id = simpleHash(wantedTaskName);

        const newTaskInternalData = new TaskInternalData();
        newTaskInternalData.name = newTaskConfigData.name;
        newTaskInternalData.id = newTaskConfigData.id;

        this.addTaskConfigData(newTaskConfigData);
        this.addTaskInternalData(newTaskInternalData);
      }
    });
  }
}

export default TasksData;
