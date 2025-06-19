import { NgModule } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormComponent } from './task-form/task-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material-module/angular-material-module.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent
  },
  {
    path: 'new',
    component: TaskFormComponent
  }
];


@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent
  ],
  imports: [
    SharedModule,
    AngularMaterialModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ],
})
export class TasksModule { }
