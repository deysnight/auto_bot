import { eStatsLabel } from '../global.enum';

interface ITaskStats {
  [eStatsLabel.executionCount]: number;
  [eStatsLabel.averageExecutionTime]: number;
  [eStatsLabel.lastExecution]: Date;
}

export default ITaskStats;
