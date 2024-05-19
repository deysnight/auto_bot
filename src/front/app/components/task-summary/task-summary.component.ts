import { Component, Input, OnInit } from '@angular/core';
import cronstrue from 'cronstrue';
import ISummaryTask from '../../../../entities/dtos/taskSummary.dto';
import { WebSocketService } from '../../services/web-socket.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import IUpdateTaskMessageWS from '../../../../entities/dtos/taskUpdateWS.dto';
import { eUpdateTaskEventWS } from '../../../../entities/global.enum';
import timestampToDate from '../../../../utils/timestampToTime';

@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.component.html',
  styleUrls: ['./task-summary.component.scss'],
})
export class TaskSummaryComponent implements OnInit {
  @Input() taskSummary!: ISummaryTask;
  id: string = '';
  name: string = '';
  enabled: boolean = false;
  cronString: string = '';
  nextExecDate: Date | null = new Date(0);
  nextExecString: string = '';
  startExecDate: Date = new Date(0);
  chipConfigRequire: boolean = false;
  chipIsNext: boolean = false;
  chipIsLast: boolean = false;
  chipIsRunning: boolean = false;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    const { id, name, cron, enabled, execTime } = this.taskSummary;
    this.id = id;
    this.name = name;
    this.enabled = enabled;
    this.nextExecDate = new Date(execTime as unknown as string);
    if (cron === '') {
      this.chipConfigRequire = true;
    } else {
      this.cronString = cronstrue.toString(cron);
      this.nextExecString = this.buildNextExecString();
      setInterval(() => {
        this.nextExecString = this.buildNextExecString();
      }, 1000);
    }

    this.webSocketService.subscribeToUpdate(this.processMessage.bind(this));
  }

  processMessage(err: null, msg: IUpdateTaskMessageWS) {
    const { id, event, data } = msg;
    if (event === eUpdateTaskEventWS.endTask && this.chipIsLast) {
      this.chipIsLast = false;
    }
    if (event === eUpdateTaskEventWS.nextTask && this.chipIsNext) {
      this.chipIsNext = false;
    }

    if (id !== this.id) return;

    if (event === eUpdateTaskEventWS.startTask) {
      this.startExecDate = new Date(data.startDate as string);
      this.chipIsRunning = true;
      this.chipIsNext = false;
    } else if (event === eUpdateTaskEventWS.endTask) {
      this.startExecDate = new Date(0);
      this.chipIsRunning = false;
      this.chipIsLast = true;
    } else if (event === eUpdateTaskEventWS.taskNextExec) {
      this.nextExecDate = new Date(data.nextExecDate as string);
    } else if (event === eUpdateTaskEventWS.nextTask) {
      this.chipIsNext = true;
    }
  }

  toggleTask(event: MatSlideToggleChange) {
    console.log('toggle', event.checked);
    this.enabled = event.checked;
    //make request to toggle task
    // if request fail
    // restore previous slide state
  }

  buildNextExecString() {
    if (this.nextExecDate === null) return '';

    let resString = '';
    if (this.chipIsRunning) {
      const currentTime = new Date();
      const diff = currentTime.getTime() - this.startExecDate.getTime();
      const timeAttr = timestampToDate(diff);
      resString += 'Running ...';
      resString += ` ${timeAttr.hours.toString().padStart(2, '0')}`;
      resString += `:${timeAttr.minutes.toString().padStart(2, '0')}`;
      resString += `:${timeAttr.seconds.toString().padStart(2, '0')}`;
    } else {
      const currentTime = new Date();
      const diff =
        (this.nextExecDate as Date).getTime() - currentTime.getTime();

      if (this.enabled === false) return '';
      if (diff < 0) return 'In execution queue';

      const timeAttr = timestampToDate(diff);
      resString += 'Next execution in';
      resString += timeAttr.hours !== 0 ? ` ${timeAttr.hours} hours` : '';
      resString +=
        timeAttr.minutes !== 0 ? ` ${timeAttr.minutes} minutes and` : '';
      resString += ` ${timeAttr.seconds} seconds`;
    }
    return resString;
  }
}
