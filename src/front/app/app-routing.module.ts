import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalTasksViewPage } from './pages/global-tasks-view/global-tasks-view.page';
import { TaskDataViewPage } from './pages/task-data-view/task-data-view.page';

const routes: Routes = [
  { path: 'task/:id', component: TaskDataViewPage },
  { path: '', component: GlobalTasksViewPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
