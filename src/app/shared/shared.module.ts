import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AngularMaterialModule } from '../angular-material-module/angular-material-module.module';
import { TruncarPipe } from './pipes/truncar.pipe';
import { AutofocusDirective } from './components/autofocus.directive';



@NgModule({
  declarations: [
    DeleteDialogComponent,
    TruncarPipe,
    AutofocusDirective,
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
    AutofocusDirective,
  ]
})
export class SharedModule { }
