import path from 'path';
import {
  closeSync,
  constants,
  existsSync,
  openSync,
  readFileSync,
  writeFileSync,
  writeSync,
} from 'fs';
import IGlobalData from './ientities/iglobal-data.entity.js';
import envConfig from '../config/env.config.js';
import { eSignal } from './global.enum.js';

class GlobalData implements IGlobalData {
  private defaultGlobalSaveFile: string = path.join(
    path.resolve(),
    'global_data.sophon'
  );

  taskIdList: string[] = [];

  constructor() {
    process.on('exit', () => this.save());
  }

  load(): void {
    try {
      const filePath =
        envConfig.scheduler.globalSaveFile || this.defaultGlobalSaveFile;
      if (!existsSync(filePath)) {
        return;
      }
      const tmpLoaded = JSON.parse(
        readFileSync(filePath, 'utf-8')
      ) as IGlobalData;

      this.taskIdList = tmpLoaded.taskIdList;
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  save(): void {
    const filePath =
      envConfig.scheduler.globalSaveFile || this.defaultGlobalSaveFile;
    const tmpToSave = {
      taskIdList: this.taskIdList,
    } as IGlobalData;

    writeFileSync(filePath, JSON.stringify(tmpToSave), { flag: 'w+' });
    (process.emit as Function)(eSignal.GLOBALSAVEFILE);
  }
}

export default GlobalData;
