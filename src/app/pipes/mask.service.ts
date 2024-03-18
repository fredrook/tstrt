import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MaskService {
  constructor() {}
  date = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]; // '00/00/0000';
}

@Pipe({
  name: 'cpf',
})
export class CPFPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    value = value.replace(/\D/g, '');

    if (value.length !== 11) return value;
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
