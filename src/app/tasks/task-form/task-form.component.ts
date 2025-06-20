import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../models/ITask';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {

  titulo?: string;
  form!: FormGroup;
  task?: ITask;
  id?: number;
  HOJE = Date.now();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
  ) {
  }


  ngOnInit() {
    this.form = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      dataVencimento: new FormControl('', Validators.required),
      tarefaCompletada: new FormControl(false)
    },
      // null, 
      // this.tarefaDuplicada()
    );

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
          error: (error) => console.error(error)
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
              this.taskService.openSnackBar(`Tarefa ${result.titulo} atualizada com sucesso!`, "Fechar");
              this.router.navigate(['/tasks']);
            },
            error: (error) => console.error(error)
          });
      }
      else {
        this.taskService
          .create(this.form.value as ITask)
          .subscribe({
            next: (result) => {
              this.taskService.openSnackBar("Tarefa criada com sucesso!", "Fechar");
              this.router.navigate(['/tasks']);
            },
            error: (error) => console.error(error)
          });
      }
    }
  }

  // tarefaDuplicada(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {

  //     var city = <City>{};
  //     city.id = (this.id) ? this.id : 0;
  //     city.name = this.form.controls['name'].value;
  //     city.lat = +this.form.controls['lat'].value;
  //     city.lon = +this.form.controls['lon'].value;
  //     city.countryId = +this.form.controls['countryId'].value;

  //     var url = environment.baseUrl + 'api/Cities/IsDupeCity';
  //     return this.http.post<boolean>(url, city).pipe(map(result => {

  //       return (result ? { tarefaDuplicada: true } : null);
  //     }));
  //   }

  // }
}

