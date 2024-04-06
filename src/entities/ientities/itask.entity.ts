interface ITask {
  taskName: string;
  init(): void;
  run(): void;
  afterRun(): void;
}

export default ITask;
