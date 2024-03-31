import ITaskInternalData from './ientities/itask-internal-data.entity.js';
import TaskId from './task-id.entity';

class TaskInternalData extends TaskId implements ITaskInternalData {
  ramdomvar: null = null;
}

export default TaskInternalData;
