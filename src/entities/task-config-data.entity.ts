import ITaskConfigData from './ientities/itask-config-data.entity.js';
import TaskId from './task-id.entity.js';

class TaskConfigData extends TaskId implements ITaskConfigData {
  exec_interval: null = null;
  priority: null = null;
  enabled: boolean = false;
}

export default TaskConfigData;
