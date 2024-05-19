import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTasksViewPage } from './global-tasks-view.page';

describe('GlobalTasksViewPageComponent', () => {
  let component: GlobalTasksViewPage;
  let fixture: ComponentFixture<GlobalTasksViewPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalTasksViewPage],
    });
    fixture = TestBed.createComponent(GlobalTasksViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
