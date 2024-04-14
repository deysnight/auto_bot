import { ePriority } from './global.enum.js';
import IDelay from './ientities/idelay.entity.js';
import ITaskConfigData from './ientities/itask-config-data.entity.js';
import TaskId from './task-id.entity.js';
import Task, { Type } from './task.entity.js';

class TaskConfigData extends TaskId implements ITaskConfigData {
  handle: Type<Task> = Task;
  cron: string = '';
  delay: IDelay = { enabled: false, minDelay: 0, maxDelay: 0 };
  priority: ePriority = ePriority.NONE;
  enabled: boolean = false;
}

export default TaskConfigData;
