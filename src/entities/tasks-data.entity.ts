import path from 'path';
import ITasksData from './ientities/itasks-data.entity.js';
import TaskConfigData from './task-config-data.entity.js';
import TaskInternalData from './task-internal-data.entity.js';
import envConfig from '../config/env.config.js';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { eSignal } from './global.enum.js';
import Tasks from '../../tasks/index.js';
import { simpleHash } from '../utils/simpleHash.js';

class TasksData implements ITasksData {
  private defaultTasksSaveFile: string = path.join(
    path.resolve(),
    'tasks_data.sophon'
  );

  taskConfigData: TaskConfigData[] = [];
  taskInternalData: TaskInternalData[] = [];

  constructor() {
    process.on('exit', () => this.save());
  }

  load(): void {
    try {
      const filePath = envConfig.tasksSaveFile || this.defaultTasksSaveFile;
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
    const filePath = envConfig.tasksSaveFile || this.defaultTasksSaveFile;
    const tmpToSave = {
      taskConfigData: this.taskConfigData,
      taskInternalData: this.taskInternalData,
    } as ITasksData;

    writeFileSync(filePath, JSON.stringify(tmpToSave), { flag: 'w+' });
    (process.emit as Function)(eSignal.TASKSSAVEFILE);
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

        this.addTaskConfigData(newTaskConfigData);
      }
    });
  }
}

export default TasksData;
