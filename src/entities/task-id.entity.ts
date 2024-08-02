import ITaskId from './ientities/itask-id.entity.js';

class TaskId implements ITaskId {
  name: string = '';
  id: string = '';
  registered?: boolean = false;

  constructor() {}
}

export default TaskId;
