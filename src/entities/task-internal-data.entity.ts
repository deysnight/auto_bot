import ITaskCustomVar from './ientities/icustomvar.entity.js';
import ITaskStats from './ientities/istats.entity.js';
import ITaskInternalData from './ientities/itask-internal-data.entity.js';
import TaskId from './task-id.entity.js';

class TaskInternalData extends TaskId implements ITaskInternalData {
  statistics: ITaskStats = {
    executionCount: 0,
    averageExecutionTime: 0,
    lastExecution: new Date(0),
  };
  internals: ITaskCustomVar[] = [];
}

export default TaskInternalData;
