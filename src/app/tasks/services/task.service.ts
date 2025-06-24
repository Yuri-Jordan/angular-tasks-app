import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private tasksSubject = new BehaviorSubject<PaginatedItems<ITask>>({} as PaginatedItems<ITask>);
  public tasks$ = this.tasksSubject.asObservable();

  private url = 'api/tasks';

  constructor(private http: HttpClient) { }

  getItems(
    event: PageEvent,
    sort: MatSort,
    defaultSortColumn: string,
    defaultSortOrder: string,
    defaultFilterColumn: string,
    filterQuery?: string,
  ): void {

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

    this.http.get<PaginatedItems<ITask>>(this.url, { params: params }).subscribe(resp => {
      next: this.tasksSubject.next(resp);
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao buscar:', err);
        this.tasksSubject.next({} as PaginatedItems<ITask>);
        this.openSnackBarNotFound('Nenhuma tarefa encontrada', 'Fechar');
      };
    });
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

  openSnackBarSucesso(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 7000; // 7s
    this._snackBar.open(message, action, config);
  }

  openSnackBarNotFound(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 7000; // 7s
    config.panelClass = ['snackbar-not-found'];
    this._snackBar.open(message, action, config);
  }

}
