import ITaskId from './itask-id.entity';

interface IGlobalData {
  taskIdList: ITaskId[];

  load(): void;
  save(): void;
  updateGlobalTaskId(): void;
}

export default IGlobalData;
