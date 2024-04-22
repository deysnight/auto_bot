import { openSync, writeSync, unlinkSync, closeSync } from 'fs';
import { eSignal, eSignalExit } from '../entities/global.enum.js';

class PID {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  remove(path: string) {
    try {
      unlinkSync(path);
      (process.emit as Function)(eSignal.PIDFILE);
      return true;
    } catch (err) {
      return false;
    }
  }

  removeOnExit() {
    process.on(eSignalExit, () => this.remove(this.path));
  }
}

function create(path: string, force?: boolean) {
  const pid = Buffer.from(process.pid + '\n');
  const fd = openSync(path, force ? 'w' : 'wx');
  let offset = 0;

  while (offset < pid.length) {
    offset += writeSync(fd, pid, offset, pid.length - offset);
  }

  closeSync(fd);

  return new PID(path);
}

const npid = { create };
export default npid;
