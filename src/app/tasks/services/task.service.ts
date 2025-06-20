import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../models/ITask';
import { PageEvent } from '@angular/material/paginator';
import { PaginatedItems } from '../../shared/models/PaginatedItems';
import { MatSort } from '@angular/material/sort';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class TaskService {

  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  public HOJE = Date.now();

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

  getById(id: number): Observable<ITask> {
    return this.http.get<ITask>(`${this.url}/${id}`);
  }

  create(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(this.url, task);
  }

  update(id: number, task: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.url}/${id}`, task);
  }

  delete(id: number): Observable<ITask> {
    return this.http.delete<ITask>(`${this.url}/${id}`);
  }

    getDialog(enterAnimationDuration: string, exitAnimationDuration: string, task: ITask): MatDialogRef<DeleteDialogComponent> {
    return this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Confirmação',
        content: `Você tem certeza que deseja excluir a tarefa <b>${task.titulo}</b>?`,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
      },
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 7000; // 7s
    this._snackBar.open(message, action, config);
  }

}
