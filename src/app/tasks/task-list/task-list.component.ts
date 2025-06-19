import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ITask } from '../models/ITask';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  items: ITask[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    this.taskService.getItems()
      .subscribe(items => this.items = items);
  }
}
