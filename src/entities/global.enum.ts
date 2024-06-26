export const eSignalExit = 'exitSignal';

export enum eSignal {
  GLOBALSAVEFILE = 'GlobalSaveFile',
  TASKSSAVEFILE = 'TasksSaveFile',
  BROWSER = 'Browser',
  PIDFILE = 'PidFile',
}

export enum ePriority {
  NONE = 0,
  LOWEST,
  LOW,
  NORMAL,
  HIGH,
  HIGHEST,
}

export enum eMainState {
  NONE = 0, // not running
  IDLE, // running but doing nothing
  INIT, // get task, instansiate it
  CLEAN, // delete instance, remove from queue and trigger queue update
  WAITINGDELAY, // if enable, wait delay before init task
  TASKINIT, // run task init function
  TASKEXEC, // run main task function
  TASKEND, // run end task function
}

export enum eStatsLabel {
  executionCount = 'executionCount',
  averageExecutionTime = 'averageExecutionTime',
  lastExecution = 'lastExecution',
}

export enum eUpdateTaskEventWS {
  none = 0,
  startTask,
  endTask,
  taskNextExec,
  nextTask,
}
