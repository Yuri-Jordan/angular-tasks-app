import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { ITask } from '../tasks/models/ITask';
import { TASK_MOCKS } from './mocks/ITaskMock';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  tasks: ITask[];

  constructor() {
    this.tasks = TASK_MOCKS;
  }

  createDb() {
    return { tasks: this.tasks };
  }

  getAllItems(reqInfo: any): Observable<any> {
    const items = this.tasks;
    return reqInfo.utils.createResponse$(() => ({
      body: items,
      status: 200,
    }));
  }

  getItemById(reqInfo: any): Observable<any> {
    const id = reqInfo.id;
    const item = this.tasks.find((i: any) => i.id === id);
    return reqInfo.utils.createResponse$(() => ({
      body: item,
      status: item ? 200 : 404,
    }));
  }

  addNewItem(reqInfo: any): Observable<any> {
    const newItem = reqInfo.utils.getJsonBody(reqInfo.req);
    newItem.id = this.tasks.length + 1; 
    this.tasks.push(newItem);
    return reqInfo.utils.createResponse$(() => ({
      body: newItem,
      status: 201,
    }));
  }

  updateItem(reqInfo: any): Observable<any> {
    const id = reqInfo.id;
    const updatedItem = reqInfo.utils.getJsonBody(reqInfo.req);
    const index = this.tasks.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updatedItem };
      return reqInfo.utils.createResponse$(() => ({
        body: this.tasks[index],
        status: 200,
      }));
    } else {
      return reqInfo.utils.createResponse$(() => ({
        body: { error: 'Ítem não encontrado' },
        status: 404,
      }));
    }
  }

  deleteItem(reqInfo: any): Observable<any> {
    const id = reqInfo.id;
    const index = this.tasks.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      const deletedItem = this.tasks.splice(index, 1)[0];
      return reqInfo.utils.createResponse$(() => ({
        body: deletedItem,
        status: 200,
      }));
    } else {
      return reqInfo.utils.createResponse$(() => ({
        body: { error: 'Ítem não encontrado' },
        status: 404,
      }));
    }
  }
}