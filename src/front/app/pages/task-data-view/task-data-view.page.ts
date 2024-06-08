import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskApiService } from '../../services/taskApi.service';
import ITaskFull from '../../../../entities/dtos/taskFull.dto.js';
import { ePriority } from '../../../../entities/global.enum';
import cronstrue from 'cronstrue';

@Component({
  selector: 'app-task-data-view-page',
  templateUrl: './task-data-view.page.html',
  styleUrls: ['./task-data-view.page.scss'],
})
export class TaskDataViewPage implements OnInit {
  priority = ePriority;
  id: string;
  taskFull: ITaskFull;
  cronString: string = '';

  constructor(
    private taskApiService: TaskApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.taskFull = {} as ITaskFull;
  }

  ngOnInit(): void {
    this.taskApiService.getFull(this.id).subscribe({
      next: (res) => {
        this.taskFull = res;
        this.cronString = cronstrue.toString(this.taskFull.cron);
      },
      error: (err) => console.error(err),
    });
  }

  updateCronPreview(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    try {
      this.cronString = cronstrue.toString(newValue);
    } catch {}
  }

  goToHome() {
    this.router.navigateByUrl(`/`);
  }
}
