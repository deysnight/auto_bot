import ITask from './ientities/itask.entity';

export interface Type<T> {
  new (...args: any[]): T;
}

class Task implements ITask {
  taskName: string;
  static taskName = '';

  constructor(name: string) {
    this.taskName = name;
  }

  async init(): Promise<void> {
    throw 'not implemented';
  }

  async run(): Promise<void> {
    throw 'not implemented';
  }

  async afterRun(): Promise<void> {
    throw 'not implemented';
  }
}

export default Task;
