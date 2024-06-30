import { Application, Request, Response } from 'express';
import Store from '../services/storage.service.js';
import ITaskCustomVar from '../entities/ientities/icustomvar.entity.js';

class InternalVarApi {
  protected route: string;

  constructor(app: Application) {
    this.route = 'api/internalvars';
    this.initRoutes(app);
  }

  protected initRoutes(app: Application) {
    app.post(`/${this.route}/:taskId`, this.update.bind(this));
    app.post(`/${this.route}/:taskId/reset`, this.reset.bind(this));
    app.delete(`/${this.route}/:taskId`, this.delete.bind(this));
  }

  async update(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const tcv: ITaskCustomVar = req.body;

      const store = Store.getStore();
      store.setTaskInternalVar(taskId, tcv.name, tcv.value);

      return res.status(200).json({ success: true });
    } catch (e: unknown) {
      return res.status(500).json({ msg: (e as Error).message });
    }
  }

  async reset(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const taskName: string = req.body.name;

      const store = Store.getStore();
      store.setTaskInternalVar(taskId, taskName, '');

      return res.status(200).json({ success: true });
    } catch (e: unknown) {
      return res.status(500).json({ msg: (e as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const taskName = req.body.name;

      const store = Store.getStore();
      store.deleteTaskInternalVar(taskId, taskName);

      return res.status(200).json({ success: true });
    } catch (e: unknown) {
      return res.status(500).json({ msg: (e as Error).message });
    }
  }
}

export default InternalVarApi;
