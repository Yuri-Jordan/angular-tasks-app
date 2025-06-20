import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../models/ITask';
import { TaskService } from '../services/task.service';
import { BaseFormComponent } from '../../shared/components/base-form/base-form.component';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent extends BaseFormComponent implements OnInit {

  titulo?: string;
  task?: ITask;
  id?: number;
  HOJE = Date.now();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
  ) {
    super();
  }


  ngOnInit() {
    this.form = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      descricao: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
      dataVencimento: new FormControl('', Validators.required),
      tarefaCompletada: new FormControl(false)
    });

    this.loadData();
  }

  loadData() {
    var idParam = this.activatedRoute?.snapshot?.paramMap?.get('id');
    this.id = idParam ? +idParam : 0;
    if (this.id) {
      this.taskService
        .getById(this.id)
        .subscribe({
          next: (result) => {
            this.task = result;
            this.titulo = "Editando - " + this.task.titulo;
            this.form.patchValue(this.task);
          },
          error: (error) => this.handleError(error)
        });
    }
    else {
      this.titulo = "Criando nova tarefa";
    }
  }

  onSubmit() {
    var task = (this.id) ? this.task : <ITask>{};
    if (task) {

      if (this.id) {

        this.taskService
          .update(this.id, this.form.value as ITask)
          .subscribe({
            next: (result) => {
              this.taskService.openSnackBarSucesso(`Tarefa ${result.titulo} atualizada com sucesso!`, "Fechar");
              this.router.navigate(['/tasks']);
            },
            error: (error) => this.handleError(error)
          });
      }
      else {
        this.taskService
          .create(this.form.value as ITask)
          .subscribe({
            next: (result) => {
              this.taskService.openSnackBarSucesso("Tarefa criada com sucesso!", "Fechar");
              this.router.navigate(['/tasks']);
            },
            error: (error) => this.handleError(error)
          });
      }
    }
  }


  private handleError(error: any): void {
    this.taskService.openSnackBarNotFound('statusText' in error ? error['statusText'] : "Erro ao executar ação!", "Fechar");
    this.router.navigate(['/tasks']);
  }
}

