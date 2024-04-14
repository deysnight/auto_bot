import { ePriority } from '../global.enum';
import Task, { Type } from '../task.entity';
import IDelay from './idelay.entity';

interface ITaskConfigData {
  handle?: Type<Task>;
  cron: string;
  delay: IDelay;
  priority: ePriority;
  enabled: boolean;
}

export default ITaskConfigData;
