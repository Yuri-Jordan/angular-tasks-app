import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  standalone: false,
  template: ''
})
export abstract class BaseFormComponent {

  form!: FormGroup;

  getErrors(
    control: AbstractControl,
    displayName: string,
    customMessages: { [key: string]: string } | null = null
  ): string[] {
    var errors: string[] = [];
    Object.keys(control.errors || {}).forEach((key) => {
      switch (key) {
        case 'required':
          errors.push(`${displayName} ${customMessages?.[key] ?? "é obrigatório."}`);
          break;
        case 'pattern':
          errors.push(`${displayName} ${customMessages?.[key] ?? "possui caractéres inválidos."}`);
          break;
        case 'minlength':
          const minLength = control.errors?.['minlength']?.requiredLength;
          errors.push(
            `${displayName} ${customMessages?.[key] ?? `deve ter pelo menos ${minLength} caracteres.`}`
          );
          break;
        case 'maxlength':
          const maxlength = control.errors?.['maxlength']?.requiredLength;
          errors.push(
            `${displayName} ${customMessages?.[key] ?? `deve ter no máximo ${maxlength} caracteres.`}`
          );
          break;
        default:
          errors.push(`${displayName} é inválido.`);
          break;
      }
    });
    return errors;
  }

}
