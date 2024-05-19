import { Component, OnInit } from '@angular/core';
import { TaskApiService } from '../../services/taskApi.service';
import ISummaryTask from '../../../../entities/dtos/taskSummary.dto';

@Component({
  selector: 'app-global-tasks-view-page',
  templateUrl: './global-tasks-view.page.html',
  styleUrls: ['./global-tasks-view.page.scss'],
})
export class GlobalTasksViewPage implements OnInit {
  tasksSummary: ISummaryTask[] = [];

  constructor(private taskApiService: TaskApiService) {}

  ngOnInit(): void {
    this.taskApiService.get().subscribe({
      next: (res) => {
        this.tasksSummary = res;
      },
      error: (err) => console.error(err),
    });
  }
}
