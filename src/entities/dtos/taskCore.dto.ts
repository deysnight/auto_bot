import { ePriority } from '../global.enum.js';
import IDelay from '../ientities/idelay.entity.js';
import TaskId from '../task-id.entity.js';

interface ITaskCore extends TaskId {
  cron: string;
  delay: IDelay;
  priority: ePriority;
}

export default ITaskCore;
