import { ePriority } from '../global.enum.js';
import ITaskCustomVar from '../ientities/icustomvar.entity.js';
import IDelay from '../ientities/idelay.entity.js';
import ITaskStats from '../ientities/istats.entity.js';
import TaskId from '../task-id.entity.js';

interface ITaskFull extends TaskId {
  cron: string;
  delay: IDelay;
  priority: ePriority;
  statistics: ITaskStats;
  internals: ITaskCustomVar[];
}

export default ITaskFull;
