import { Application, Request, Response } from 'express';
import Store from '../services/storage.service.js';
import { error } from 'console';
import ISummaryTask from 'src/entities/dtos/taskSummary.dto.js';

class TaskApi {
  protected route: string;

  constructor(app: Application) {
    this.route = 'tasks';
    this.initRoutes(app);
  }

  protected initRoutes(app: Application) {
    app.get(`/${this.route}`, this.getAll.bind(this));
    app.get(`/${this.route}/:entityId`, this.getById.bind(this));
    app.post(`/${this.route}`, this.update.bind(this));
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = { tasks: [] as ISummaryTask[] };
      const store = Store.getStore();
      const task = store.getAllTaskConfigData();

      task.forEach((item) => {
        const { cron, enabled, id, name } = item;
        const execTime = store
          .getRefScheduler()
          .getQueuedTaskExecTime(id)?.execTime;
        result.tasks.push({
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
    throw error('Not implemented');
    // try {
    //   const { taskId } = req.params;
    //   return res.status(200).json(result);
    // } catch (e) {
    //   return res.status(500).json({ msg: e.message, type: e.type });
    // }
  }

  async update(req: Request, res: Response) {
    throw error('Not implemented');
    // try {
    //   return res.status(200).json(result);
    // } catch (e) {
    //   return res.status(500).json({ msg: e.message, type: e.type });
    // }
  }
}

export default TaskApi;
