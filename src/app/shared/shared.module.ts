import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AngularMaterialModule } from '../angular-material-module/angular-material-module.module';
import { BaseFormComponent } from './components/base-form/base-form.component';
import { TruncarPipe } from './pipes/truncar.pipe';



@NgModule({
  declarations: [
    DeleteDialogComponent,
    TruncarPipe,
  ],
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    TruncarPipe,
  ]
})
export class SharedModule { }
