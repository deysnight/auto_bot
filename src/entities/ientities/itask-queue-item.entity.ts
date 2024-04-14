import { ePriority } from '../global.enum';

interface ITaskQueueItem {
  name: string;
  id: string;
  priority: ePriority;
  execTime: Date;
}

export default ITaskQueueItem;
