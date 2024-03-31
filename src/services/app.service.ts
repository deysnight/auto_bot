import 'dotenv/config';
import express, { Application } from 'express';
import npid from '../utils/pid.js';
import expressConfig from '../config/express.config.js';
import envConfig from '../config/env.config.js';
import webApi from '../webapi';
import sBrowser from './browser.service.js';
import Store from './storage.service.js';
import { signal } from '../entities/global.enum.js';

class App {
  expressApp: Application;

  constructor() {
    Store.getStore();
    this.expressApp = express();
    this.start();
    this.initSignal();
  }

  async start() {
    try {
      const pid = npid.create(envConfig.pidFile);
      pid.removeOnExit();
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
    this.expressApp = expressConfig(this.expressApp);

    // const tmp = new sBrowser();
    // tmp.init();

    this.expressApp.listen(envConfig.api.port, () =>
      console.log(
        `[Server] ${envConfig.appName} listening on port ${envConfig.api.port} in ${envConfig.env} mode`
      )
    );

    // Object.values(webApi).forEach((WebApi) => {
    //   new WebApi(this.expressApp);
    // });
  }

  initSignal() {
    process.on('SIGINT', () => process.exit());
    process.on('SIGTERM', () => process.exit());

    const store = Store.getStore();
    process.on(signal.PIDFILE, () => store.setSignalState(signal.PIDFILE));
    process.on(signal.GLOBALSAVEFILE, () =>
      store.setSignalState(signal.GLOBALSAVEFILE)
    );
    process.on(signal.TASKSSAVEFILE, () =>
      store.setSignalState(signal.TASKSSAVEFILE)
    );
  }
}

export default App;
