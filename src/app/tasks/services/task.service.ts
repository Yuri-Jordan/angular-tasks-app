import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../models/ITask';
import { PageEvent } from '@angular/material/paginator';
import { PaginatedItems } from '../../shared/models/PaginatedItems';
import { MatSort } from '@angular/material/sort';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class TaskService {

  private url = 'api/tasks';

  constructor(private http: HttpClient) { }

  getItems(
    event: PageEvent,
    sort: MatSort,
    defaultSortColumn: string,
    defaultSortOrder: string,
    defaultFilterColumn: string,
    filterQuery?: string,
  ): Observable<PaginatedItems<any>> {

    var params = new HttpParams()
      .set("pageIndex", event.pageIndex.toString())
      .set("pageSize", event.pageSize.toString())
      .set("sortColumn", sort ? sort.active : defaultSortColumn)
      .set("sortOrder", sort ? sort.direction : defaultSortOrder);

    if (filterQuery) {
      params = params
        .set("filterColumn", defaultFilterColumn)
        .set("filterQuery", filterQuery);
    }

    return this.http.get<PaginatedItems<ITask>>(this.url, { params: params });
  }

}
