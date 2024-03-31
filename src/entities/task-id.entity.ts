import ITaskId from './ientities/itask-id.entity.js';

class TaskId implements ITaskId {
  name: string = '';
  id: string = '';

  constructor() {}
}

export default TaskId;
