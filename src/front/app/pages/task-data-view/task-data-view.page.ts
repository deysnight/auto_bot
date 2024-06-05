import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ePriority } from '../../../../entities/global.enum.js';

@Component({
  selector: 'app-task-data-view-page',
  templateUrl: './task-data-view.page.html',
  styleUrls: ['./task-data-view.page.scss'],
})
export class TaskDataViewPage implements OnInit {
  id: string;
  tmp: any[] = ['', '', ''];

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    //get task details
  }
}
