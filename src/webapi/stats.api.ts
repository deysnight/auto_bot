import { Application, Request, Response } from 'express';
import Store from '../services/storage.service.js';

class StatApi {
  protected route: string;

  constructor(app: Application) {
    this.route = 'api/stats';
    this.initRoutes(app);
  }

  protected initRoutes(app: Application) {
    app.post(`/${this.route}/:taskId`, this.updateFromTask.bind(this));
  }

  async updateFromTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const statName = req.body.name;

      const store = Store.getStore();
      store.setTaskStats(taskId, statName, 0);

      return res.status(200).json({ success: true });
    } catch (e: unknown) {
      return res.status(500).json({ msg: (e as Error).message });
    }
  }
}

export default StatApi;
