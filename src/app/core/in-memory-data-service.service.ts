import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { ITask } from '../tasks/models/ITask';
import { TASK_MOCKS } from './mocks/ITaskMock';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  items: ITask[];

  constructor() {
    this.items = TASK_MOCKS;
  }

  createDb() {
    return { items: this.items };
  }

  getAllItems(reqInfo: any): Observable<any> {
    const items = this.items;
    return reqInfo.utils.createResponse$(() => ({
      body: items,
      status: 200,
    }));
  }

  getItemById(reqInfo: any): Observable<any> {
    const id = reqInfo.id;
    const item = this.items.find((i: any) => i.id === id);
    return reqInfo.utils.createResponse$(() => ({
      body: item,
      status: item ? 200 : 404,
    }));
  }

  addNewItem(reqInfo: any): Observable<any> {
    const newItem = reqInfo.utils.getJsonBody(reqInfo.req);
    newItem.id = this.items.length + 1; 
    this.items.push(newItem);
    return reqInfo.utils.createResponse$(() => ({
      body: newItem,
      status: 201,
    }));
  }

  updateItem(reqInfo: any): Observable<any> {
    const id = reqInfo.id;
    const updatedItem = reqInfo.utils.getJsonBody(reqInfo.req);
    const index = this.items.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updatedItem };
      return reqInfo.utils.createResponse$(() => ({
        body: this.items[index],
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
    const index = this.items.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      const deletedItem = this.items.splice(index, 1)[0];
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