import { Component, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ITask } from '../models/ITask';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  public tasks!: MatTableDataSource<ITask>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterForm!: FormGroup;


  public displayedColumns: string[] = [
    'id',
    'titulo',
    'descricao',
    'dataVencimento',
    'tarefaCompletada',
    'actions',
  ];
  defaultFilterColumn: string = "titulo";
  defaultSortColumn: string = "titulo";
  public defaultSortOrder: "asc" | "desc" = "asc";
  HOJE = Date.now();
  filtro?: string;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      titulo: new FormControl('')
    });

    this.monitorarFiltro();

    this.loadData();
  }

  private monitorarFiltro() {
    this.filterForm.get('titulo')?.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(query => {
        this.loadData(query);
      });
  }

  loadData(query?: string) {
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = 10;
    this.filtro = query;
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    if (!event) {
      return;
    }
    this.taskService
      .getItems(
        event,
        this.sort,
        this.defaultSortColumn,
        this.defaultSortOrder,
        this.defaultFilterColumn,
        this.filtro
      )
      .subscribe(resp => {
        console.log(resp);
        this.paginator.length = resp.total;
        this.paginator.pageIndex = resp.pageIndex;
        this.paginator.pageSize = resp.pageSize;
        this.tasks = new MatTableDataSource<ITask>(resp.items);
      }
      );
  }

  onDelete(task: ITask) {
    const dialogRef = this.taskService.getDialog('0.2s', '0.2s', task);

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined && result !== true) { // cliclou SIM
        this.taskService
          .delete(task.id)
          .subscribe(resp => {
            this.taskService.openSnackBar(`Tarefa ${resp.titulo} apagada com sucesso!`, "Fechar");
            this.loadData(this.filtro);
          }
          );
      }
    });
  }
}
