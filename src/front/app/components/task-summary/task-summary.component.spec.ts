import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSummaryComponent } from './task-summary.component';

describe('TaskSummaryComponent', () => {
  let component: TaskSummaryComponent;
  let fixture: ComponentFixture<TaskSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskSummaryComponent]
    });
    fixture = TestBed.createComponent(TaskSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
