import initEnv from './initEnv.config';

initEnv();

export default {
  appName: process.env['APP_NAME'],
  pidFile: process.env['PID_FILE']!,
  env: process.env['NODE_ENV'],
  api: {
    port: process.env['PORT'],
  },
};
