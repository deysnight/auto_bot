import { Server, Socket } from 'socket.io';
import { eUpdateTaskEventWS } from '../entities/global.enum.js';
import IUpdateTaskMessageWS from '../entities/dtos/taskUpdateWS.dto.js';
import { Data } from '@angular/router';

class WSS {
  private static instance: WSS;
  private IO!: Server;

  private constructor() {}

  static getWS(): WSS {
    if (!WSS.instance) {
      WSS.instance = new WSS();
    }
    return WSS.instance;
  }

  setIO(ref: Server): void {
    this.IO = ref;
  }

  private getSockList(): Map<string, Socket> {
    return this.IO.sockets.sockets;
  }

  emitUpdateTaskStatus(
    taskId: string,
    event: eUpdateTaskEventWS,
    data?: Date
  ): void {
    const message: IUpdateTaskMessageWS = {
      id: taskId,
      name: '',
      event: event,
      data: {
        startDate: null,
        nextExecDate: null,
      },
    };
    if (event === eUpdateTaskEventWS.startTask) {
      message.data.startDate = new Date();
    } else if (event === eUpdateTaskEventWS.taskNextExec) {
      message.data.nextExecDate = data as Date;
    }

    this.getSockList().forEach((socket) => {
      socket.emit('tasks:update', message);
    });
  }
}

export default WSS;
