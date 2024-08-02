import path from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import IGlobalData from './ientities/iglobal-data.entity.js';
import envConfig from '../config/env.config.js';
import { eSignal, eSignalExit } from './global.enum.js';
import ITaskId from './ientities/itask-id.entity.js';
import { simpleHash } from '../utils/simpleHash.js';
import Tasks from '../../tasks/index.js';

class GlobalData implements IGlobalData {
  private defaultGlobalSaveFile: string = path.join(
    path.resolve(),
    'global_data.sophon'
  );

  taskIdList: ITaskId[] = [];

  constructor() {
    process.on(eSignalExit, () => this.save());
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

  updateGlobalTaskId(): void {
    let tmpTask: string[] = [];
    Tasks.forEach((_task) => {
      const name = (_task as any).taskName;
      const id = simpleHash(name);
      tmpTask.push(id);
      const exist = this.taskIdList.find((item) => item.id === id);
      if (exist === undefined) {
        this.taskIdList.push({ id, name, registered: true });
      }
    });
    this.taskIdList.forEach((task) => {
      if (!tmpTask.includes(task.id)) {
        task.registered = false;
      }
    });
  }

  isTaskRegistered(id: string): boolean {
    const result = this.taskIdList.find((task) => task.id === id);
    return !!result;
  }

  getRegisteredTasks(): ITaskId[] {
    return this.taskIdList.filter((task) => task.registered === true);
  }
}

export default GlobalData;
