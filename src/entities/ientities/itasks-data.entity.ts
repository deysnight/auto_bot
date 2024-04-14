import TaskConfigData from '../task-config-data.entity.js';
import TaskInternalData from '../task-internal-data.entity.js';

interface ITasksData {
  taskConfigData: TaskConfigData[];
  taskInternalData: TaskInternalData[];

  load(): void;
  save(): void;
  updateTasksMap(): void;
  getTaskConfigData(taskName: string): TaskConfigData | undefined;
  addTaskConfigData(newTaskConfigData: TaskConfigData): void;
  getEnabledTask(): TaskConfigData[];
}

export default ITasksData;
