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

  init(): void {
    throw 'not implemented';
  }
  run(): void {
    throw 'not implemented';
  }
  afterRun(): void {
    throw 'not implemented';
  }
}

export default Task;
