import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncar',
  standalone: false
})
export class TruncarPipe implements PipeTransform {

  transform(value: string, limite: number = 10, sufixo: string = '...'): string {
    if (!value) return '';
    return value.length > limite ? value.substring(0, limite) + sufixo : value;
  }

}
