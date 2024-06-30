import { Application, Request, Response } from 'express';
import Store from '../services/storage.service.js';
import { eStatsLabel } from 'src/entities/global.enum.js';

class StatApi {
  protected route: string;

  constructor(app: Application) {
    this.route = 'api/stats';
    this.initRoutes(app);
  }

  protected initRoutes(app: Application) {
    app.post(`/${this.route}/:taskId/reset`, this.reset.bind(this));
  }

  async reset(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const statName: eStatsLabel = req.body.name;

      const store = Store.getStore();
      store.setTaskStats(taskId, statName, 0);

      return res.status(200).json({ success: true });
    } catch (e: unknown) {
      return res.status(500).json({ msg: (e as Error).message });
    }
  }
}

export default StatApi;
