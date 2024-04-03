import ITaskQueueItem from '../entities/ientities/itask-queue-item.entity';

class Scheduler {
  taskQueue: ITaskQueueItem[] = [];

  constructor() {}

  init() {}

  mainloop() {
    //take next task in queue
    //delay
    //exec inti
    //exec task
    //exec afterrun
    //update queue et tout et tout
    //recommence
  }
}

export default Scheduler;
