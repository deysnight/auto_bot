import { eUpdateTaskEventWS } from '../global.enum';
import TaskId from '../task-id.entity';

export interface IUpdateTaskDataWS {
  startDate: Date | string | null;
  nextExecDate: Date | string | null;
}

interface IUpdateTaskMessageWS extends TaskId {
  event: eUpdateTaskEventWS;
  data: IUpdateTaskDataWS;
}

export default IUpdateTaskMessageWS;
