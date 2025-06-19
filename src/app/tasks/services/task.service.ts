import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../models/ITask';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class TaskService {

   private itemsUrl = 'api/tasks';

  constructor(private http: HttpClient) { }

  getItems(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.itemsUrl);
  }
  
}
