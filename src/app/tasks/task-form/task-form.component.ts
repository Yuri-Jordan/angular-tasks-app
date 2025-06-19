import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '../models/ITask';

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


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
    // if (this.id) {

    //   var url = environment.baseUrl + 'api/Cities/' + this.id;
    //   this.http.get<City>(url).subscribe({
    //     next: (result) => {
    //       this.task = result;
    //       this.titulo = "Editando - " + this.task.name;

    //       // update the form with the city value
    //       this.form.patchValue(this.task);
    //     },
    //     error: (error) => console.error(error)
    //   });
    // }
    // else {
    //   this.titulo = "Criando nova tarefa";
    // }
  }

  onSubmit() {
    var task = (this.id) ? this.task : <ITask>{};
    // if (task) {
    //   task.name = this.form.controls['name'].value;
    //   task.lat = +this.form.controls['lat'].value;
    //   task.lon = +this.form.controls['lon'].value;
    //   task.countryId = +this.form.controls['countryId'].value;

    //   if (this.id) {
    //     // EDIT mode

    //     var url = environment.baseUrl + 'api/Cities/' + task.id;
    //     this.http
    //       .put<City>(url, task)
    //       .subscribe({
    //         next: (result) => {
    //           console.log("City " + task!.id + " has been updated.");

    //           // go back to cities view
    //           this.router.navigate(['/cities']);
    //         },
    //         error: (error) => console.error(error)
    //       });
    //   }
    //   else {
    //     // ADD NEW mode
    //     var url = environment.baseUrl + 'api/Cities';
    //     this.http
    //       .post<City>(url, task)
    //       .subscribe({
    //         next: (result) => {

    //           console.log("City " + result.id + " has been created.");

    //           // go back to cities view
    //           this.router.navigate(['/cities']);
    //         },
    //         error: (error) => console.error(error)
    //       });
    //   }
    // }
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

