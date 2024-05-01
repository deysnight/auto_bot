import 'dotenv/config';
import express, { Application } from 'express';
import npid from './pid.service.js';
import expressConfig from '../config/express.config.js';
import envConfig from '../config/env.config.js';
import webApi from '../webapi/index.js';
import sBrowser from './browser.service.js';
import Store from './storage.service.js';
import { eSignal, eSignalExit } from '../entities/global.enum.js';
import Scheduler from './scheduler.service.js';

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
    const tmpStore = Store.getStore();
    const tmpBrowser = new sBrowser();
    tmpStore.setRefBrowser(tmpBrowser);
    tmpBrowser.init();
    const tmpScheduler = new Scheduler();
    tmpStore.setRefScheduler(tmpScheduler);
    tmpScheduler.init();
    tmpScheduler.autoMainLoop();
    this.expressApp.listen(envConfig.api.port, () =>
      console.log(
        `[Server] ${envConfig.appName} listening on port ${envConfig.api.port} in ${envConfig.env} mode`
      )
    );

    Object.values(webApi).forEach((WebApi) => {
      new WebApi(this.expressApp);
    });
  }

  initSignal() {
    process.on('SIGINT', () => (process.emit as Function)(eSignalExit));
    process.on('SIGTERM', () => (process.emit as Function)(eSignalExit));

    const store = Store.getStore();
    process.on(eSignal.PIDFILE, () => store.setSignalState(eSignal.PIDFILE));
    process.on(eSignal.BROWSER, () => store.setSignalState(eSignal.BROWSER));
    process.on(eSignal.GLOBALSAVEFILE, () =>
      store.setSignalState(eSignal.GLOBALSAVEFILE)
    );
    process.on(eSignal.TASKSSAVEFILE, () =>
      store.setSignalState(eSignal.TASKSSAVEFILE)
    );
  }
}

export default App;
