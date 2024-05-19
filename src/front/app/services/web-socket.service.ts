import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import IUpdateTaskMessageWS from '../../../entities/dtos/taskUpdateWS.dto';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socket: io.Socket;

  constructor() {
    this.socket = io.io();
    console.log(this.socket);
  }

  subscribeToUpdate(cb: Function): void {
    if (!this.socket) return;
    this.socket.on('tasks:update', (msg: IUpdateTaskMessageWS) => {
      cb(null, msg);
    });
  }
}
