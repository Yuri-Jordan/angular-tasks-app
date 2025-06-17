import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormComponent } from '../task-form/task-form.component';

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
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TasksModule { }
