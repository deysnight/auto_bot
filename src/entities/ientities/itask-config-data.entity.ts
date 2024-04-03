import { ePriority } from '../global.enum';
import IDelay from './idelay.entity';

interface ITaskConfigData {
  cron: string;
  delay: IDelay;
  priority: ePriority;
  enabled: boolean;
  execCount: number;
}

export default ITaskConfigData;
