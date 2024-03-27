import 'dotenv/config';
import express, { Application } from 'express';
import npid from '../utils/pid.js';
import expressConfig from '../config/express.config.js';
import envConfig from '../config/env.config.js';
import webApi from '../webapi';

class App {
  expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.start();
  }

  start() {
    try {
      const pid = npid.create(envConfig.pidFile);
      pid.removeOnExit();
    } catch (err) {
      console.log(err);
      process.exit(1);
    }

    this.expressApp = expressConfig(this.expressApp);

    this.expressApp.listen(envConfig.api.port, () =>
      console.log(
        `[Server] ${envConfig.appName} listening on port ${envConfig.api.port} in ${envConfig.env} mode`
      )
    );

    // Object.values(webApi).forEach((WebApi) => {
    //   new WebApi(this.expressApp);
    // });
  }
}

export default App;
