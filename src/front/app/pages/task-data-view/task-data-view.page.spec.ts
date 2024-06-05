import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDataViewPage } from './task-data-view.page';

describe('TaskDataViewPageComponent', () => {
  let component: TaskDataViewPage;
  let fixture: ComponentFixture<TaskDataViewPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskDataViewPage],
    });
    fixture = TestBed.createComponent(TaskDataViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
