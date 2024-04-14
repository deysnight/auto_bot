interface ITask {
  taskName: string;
  init(): Promise<void>;
  run(): Promise<void>;
  afterRun(): Promise<void>;
}

export default ITask;
