import TaskId from '../task-id.entity';

interface ISummaryTask extends TaskId {
  enabled: boolean;
  cron: string;
  execTime: Date | null;
}

export default ISummaryTask;
