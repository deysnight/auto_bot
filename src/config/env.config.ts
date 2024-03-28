import initEnv from './initEnv.config';

initEnv();

export default {
  appName: process.env['APP_NAME'],
  pidFile: process.env['PID_FILE']!,
  env: process.env['NODE_ENV'],
  browser: {
    headless: process.env['BROWSER_HEADLESS'] === 'true',
    width: +process.env['BROWSER_WIDTH']!,
    height: +process.env['BROWSER_HEIGHT']!,
    deviceScaleFactor: +process.env['BROWSER_SCALE']!,
    userDataDir: process.env['BROWSER_DATADIR'],
  },
  api: {
    port: process.env['API_PORT'],
  },
};
