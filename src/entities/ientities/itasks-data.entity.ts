import TaskConfigData from '../task-config-data.entity.js';
import TaskInternalData from '../task-internal-data.entity.js';
import Task, { Type } from '../task.entity.js';
import IDelay from './idelay.entity.js';
import { ePriority, eStatsLabel } from '../global.enum';

interface ITasksData {
  taskConfigData: TaskConfigData[];
  taskInternalData: TaskInternalData[];

  load(): void;
  save(): void;
  updateTasksMap(): void;
  getTaskConfigData(taskName: string): TaskConfigData | undefined;
  addTaskConfigData(newTaskConfigData: TaskConfigData): void;
  getAllTaskConfigData(): TaskConfigData[];
  getEnabledTask(): TaskConfigData[];
  setTaskEnabled(id: string, newState: boolean): void;
  getTaskConstructor(id: string): Type<Task>;
  getTaskName(id: string): string;
  getTaskDelay(id: string): IDelay;
  setTaskDelay(id: string, newDelay: IDelay): void;
  getTaskCron(id: string): string;
  setTaskCron(id: string, newCron: string): void;
  getTaskPriority(id: string): ePriority;
  setTaskPriority(id: string, newPriority: ePriority): void;
  getTaskStats(id: string, varName: eStatsLabel): number | Date;
  setTaskStats(id: string, varName: eStatsLabel, value: number | Date): void;
  getTaskIntervalVarList(id: string): string[];
  getTaskInternalVar(id: string, varName: string): string | number | undefined;
  setTaskInternalVar(id: string, varName: string, value: string | number): void;
  deleteTaskInternalVar(id: string, varName: string): void;
}

export default ITasksData;
