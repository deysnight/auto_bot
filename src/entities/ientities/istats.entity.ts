export enum eStatsLabel {
  executionCount = 0,
  averageExecutionTime,
  lastExecution,
}

interface ITaskStats {
  executionCount: number;
  averageExecutionTime: number;
  lastExecution: Date;
}

export default ITaskStats;
