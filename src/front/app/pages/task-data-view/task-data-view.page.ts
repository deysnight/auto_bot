import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ePriority } from '../../../../entities/global.enum.js';

@Component({
  selector: 'app-task-data-view-page',
  templateUrl: './task-data-view.page.html',
  styleUrls: ['./task-data-view.page.scss'],
})
export class TaskDataViewPage implements OnInit {
  id: string;
  tmp: any[] = ['', '', ''];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    //get task details
  }

  goToHome() {
    this.router.navigateByUrl(`/`);
  }
}
