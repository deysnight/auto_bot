import { ePriority } from './global.enum.js';
import IDelay from './ientities/idelay.entity.js';
import ITaskConfigData from './ientities/itask-config-data.entity.js';
import TaskId from './task-id.entity.js';

class TaskConfigData extends TaskId implements ITaskConfigData {
  cron: string = '';
  delay: IDelay = { enabled: false, minDelay: 0, maxDelay: 0 };
  priority: ePriority = ePriority.NONE;
  enabled: boolean = false;
  execCount: number = 0;
}

export default TaskConfigData;
