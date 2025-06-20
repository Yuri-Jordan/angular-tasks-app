import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { ITask } from '../tasks/models/ITask';
import { TASK_MOCKS } from './mocks/ITaskMock';
import { PaginatedItems } from '../shared/models/PaginatedItems';

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

  get(reqInfo: RequestInfo): Observable<PaginatedItems<any>> {
    console.log('chamada GET', reqInfo);

    if (reqInfo.id) {
      return this.getById(reqInfo);
    }

    let items = this.tasks;

    // FILTRO
    const filterColumn = reqInfo.query.get('filterColumn')?.[0];
    const filterQuery = reqInfo.query.get('filterQuery')?.[0];

    if (filterColumn && filterQuery) {
      items = items.filter(item =>
        String((item as any)[filterColumn])?.trim()?.toLowerCase()?.includes(filterQuery?.trim()?.toLowerCase())
      );
    }

    //ORDENAÇÃO
    const sortColumn = reqInfo.query.get('sortColumn')?.[0];
    const sortOrder = reqInfo.query.get('sortOrder')?.[0] ?? 'asc';

    if (sortColumn) {
      items = [...items].sort((a, b) => {
        let aValue = (a as any)[sortColumn];
        let bValue = (b as any)[sortColumn];

        if (aValue instanceof Date && bValue instanceof Date) {
          aValue = aValue.getTime();
          bValue = bValue.getTime();
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortOrder === 'asc'
          ? (aValue > bValue ? 1 : aValue < bValue ? -1 : 0)
          : (aValue < bValue ? 1 : aValue > bValue ? -1 : 0);
      });
    }

    // PAGINAÇÃO
    const pageIndex = Number(reqInfo.query.get('pageIndex') ?? 0);
    const pageSize = Number(reqInfo.query.get('pageSize') ?? 10);

    const start = pageIndex * pageSize;
    const end = start + pageSize;
    const pagedItems = items.slice(start, end);

    console.log('paginacao', {
      start,
      end,
      pageIndex,
      pageSize,
      pagedItems
    });


    return reqInfo.utils.createResponse$(() => ({
      body: {
        items: pagedItems,
        total: items.length,
        pageIndex,
        pageSize
      } as PaginatedItems<any>,
      status: 200,
    }));
  }

  getById(reqInfo: any): Observable<any> {
    const id = reqInfo.id;
    const item = this.tasks.find((i: any) => i.id === id);
    return reqInfo.utils.createResponse$(() => ({
      body: item,
      status: item ? 200 : 404,
    }));
  }

  post(reqInfo: any): Observable<any> {
    const newItem = reqInfo.utils.getJsonBody(reqInfo.req);
    newItem.id = this.tasks.length + 1;
    this.tasks.push(newItem);
    return reqInfo.utils.createResponse$(() => ({
      body: newItem,
      status: 201,
    }));
  }

  put(reqInfo: any): Observable<any> {
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

  delete(reqInfo: any): Observable<any> {
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