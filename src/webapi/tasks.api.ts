import { Application, Request, Response } from 'express';
import Store from '../services/storage.service.js';
import { error } from 'console';
import ISummaryTask from '../entities/dtos/taskSummary.dto.js';
import ITaskFull from '../entities/dtos/taskFull.dto.js';
import { eStatsLabel } from '../entities/global.enum.js';
import ITaskCustomVar from '../entities/ientities/icustomvar.entity.js';

class TaskApi {
  protected route: string;

  constructor(app: Application) {
    this.route = 'api/tasks';
    this.initRoutes(app);
  }

  protected initRoutes(app: Application) {
    app.get(`/${this.route}`, this.getAll.bind(this));
    app.get(`/${this.route}/:taskId`, this.getById.bind(this));
    app.post(`/${this.route}/:taskId`, this.update.bind(this));
    app.delete(`/${this.route}/:taskId`, this.delete.bind(this));
  }

  async getAll(req: Request, res: Response) {
    try {
      const result: ISummaryTask[] = [];
      const store = Store.getStore();
      const task = store.getAllTaskConfigData();

      task.forEach((item) => {
        const { cron, enabled, id, name } = item;
        const execTime = store
          .getRefScheduler()
          .getQueuedTaskExecTime(id)?.execTime;
        result.push({
          id,
          name,
          enabled,
          cron,
          execTime: execTime || null,
        });
      });
      return res.status(200).json(result);
    } catch (e: unknown) {
      return res.status(500).json({ msg: (e as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { taskId } = req.params;

      const store = Store.getStore();
      const stats = {
        [eStatsLabel.averageExecutionTime]: store.getTaskStats(
          taskId,
          eStatsLabel.averageExecutionTime
        ) as number,
        [eStatsLabel.executionCount]: store.getTaskStats(
          taskId,
          eStatsLabel.executionCount
        ) as number,
        [eStatsLabel.lastExecution]: store.getTaskStats(
          taskId,
          eStatsLabel.lastExecution
        ) as Date,
      };

      const internalVarNameList = store.getTaskIntervalVarList(taskId);

      const result: ITaskFull = {
        id: taskId,
        name: store.getTaskName(taskId),
        cron: store.getTaskCron(taskId),
        delay: store.getTaskDelay(taskId),
        priority: store.getTaskPriority(taskId),
        statistics: stats,
        internals: internalVarNameList.map((name) => {
          const res: ITaskCustomVar = {
            name,
            value: store.getTaskInternalVar(taskId, name)!,
          };
          return res;
        }),
      };
      return res.status(200).json(result);
    } catch (e: unknown) {
      return res.status(500).json({ msg: (e as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    throw error('Not implemented');
    // try {
    //   return res.status(200).json(result);
    // } catch (e) {
    //   return res.status(500).json({ msg: e.message, type: e.type });
    // }
  }

  async delete(req: Request, res: Response) {
    throw error('Not implemented');
    // try {
    //   return res.status(200).json(result);
    // } catch (e) {
    //   return res.status(500).json({ msg: e.message, type: e.type });
    // }
  }
}

export default TaskApi;
