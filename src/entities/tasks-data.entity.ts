import path from 'path';
import ITasksData from './ientities/itasks-data.entity.js';
import TaskConfigData from './task-config-data.entity.js';
import TaskInternalData from './task-internal-data.entity.js';
import envConfig from '../config/env.config.js';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { eSignal } from './global.enum.js';

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
}

export default TasksData;
