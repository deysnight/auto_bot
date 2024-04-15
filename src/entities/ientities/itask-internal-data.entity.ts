import ITaskCustomVar from './icustomvar.entity';
import ITaskStats from './istats.entity';

interface ITaskInternalData {
  statistics: ITaskStats;
  internals: ITaskCustomVar[];
}

export default ITaskInternalData;
