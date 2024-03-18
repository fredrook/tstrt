import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable()
export class MaskService {

  // date = [/[0-3]/, /\d/, '/', /[0-1]/, /\d/, '/', /[1-2]/, /\d/, /\d/, /\d/]; // '00/00/0000';
  date = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]; // '00/00/0000';
  time = [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/]; // '00:00:00';
  timeshort = [/\d/, /\d/, ':', /\d/, /\d/]; // '00:00';
  cep = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]; // '00000-000';
  telFixo = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]; //  '(00) 0000-0000';
  telCelular = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]; //  '(00) 00000-0000';
  cpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]; // '000.000.000-00';
  cnpj = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]; // '00.000.000/0000-00';
  cei = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]; // 11 ou 12 digitos numericos
  money = [/\d/, /\d/, /\d/, /\d/, /\d/];
  altura = [/[0-2]/, ',', /\d/, /\d/];
  peso = [/\d/, /\d/, /\d/];
  digito = [/\d/];
  placaVeiculo = [/[a-z]/, /[a-z]/, /[a-z]/, '-', /\d/, /\d/, /\d/, /\d/];
  renavam = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  ano = [/\d/, /\d/, /\d/, /\d/];
  rg = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  compentencia = [/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/];
  compenteciames = [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor() {
  }

}

@Pipe({
  name: 'cpf'
})
export class CPFPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length !== 11) return value; // Se o CPF não tiver 11 dígitos, retorna sem formatar

    // Formata o CPF com a máscara 000.000.000-00
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}