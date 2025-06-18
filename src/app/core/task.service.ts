import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../tasks/models/ITask';

@Injectable()
export class TaskService {

   private itemsUrl = 'api/items';

  constructor(private http: HttpClient) { }

  getItems(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.itemsUrl);
  }
  
}
