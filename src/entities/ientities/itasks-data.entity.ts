import TaskConfigData from '../task-config-data.entity.js';
import TaskInternalData from '../task-internal-data.entity.js';
import Task, { Type } from '../task.entity.js';
import IDelay from './idelay.entity.js';
import { eStatsLabel } from './istats.entity.js';

interface ITasksData {
  taskConfigData: TaskConfigData[];
  taskInternalData: TaskInternalData[];

  load(): void;
  save(): void;
  updateTasksMap(): void;
  getTaskConfigData(taskName: string): TaskConfigData | undefined;
  addTaskConfigData(newTaskConfigData: TaskConfigData): void;
  getEnabledTask(): TaskConfigData[];
  getTaskConstructor(id: string): Type<Task>;
  getTaskDelay(id: string): IDelay;
  getTaskStats(id: string, varName: eStatsLabel): number | Date;
  setTaskStats(id: string, varName: eStatsLabel, value: number | Date): void;
}

export default ITasksData;
