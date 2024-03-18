import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadorCEPService } from '../../service/validadorCEP.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css'],
})
export class CadastroClienteComponent implements OnInit {
  registrarForm: FormGroup;
  months = [
    { name: 'Janeiro', value: 1 },
    { name: 'Fevereiro', value: 2 },
    { name: 'Março', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Maio', value: 5 },
    { name: 'Junho', value: 6 },
    { name: 'Julho', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Setembro', value: 9 },
    { name: 'Outubro', value: 10 },
    { name: 'Novembro', value: 11 },
    { name: 'Dezembro', value: 12 },
  ];
  years: number[] = [];
  cpfInput: string = '';
  isCadastrado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private validadorCEPService: ValidadorCEPService,
    private router: Router
  ) {
    this.registrarForm = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      cpf: [null, Validators.required],
      cep: [null, Validators.required],
      estado: [''],
      inputEndereco: [''],
      cidade: [''],
      cdcredito: [false],
      boleto: [false],
      nomeCard: [null, Validators.required],
      dtExpiracao: [null, Validators.required],
      ano: [null, Validators.required],
      numbCard: [null, Validators.required],
      codSeg: [null, Validators.required],
    });
  }

  @ViewChild('inputCEP') inputCEP!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 10; year++) {
      this.years.push(year);
    }
  }

  ngAfterViewInit(): void {
    if (this.inputCEP) {
      this.inputCEP.nativeElement.addEventListener('change', () => {
        const cepValue: string = this.inputCEP.nativeElement.value;
        if (cepValue.length === 8) {
          this.buscarEnderecoPorCep(cepValue);
        }
      });
    }
  }

  buscarEnderecoPorCep(cep: string) {
    this.validadorCEPService.buscarEnderecoPorCep(cep).subscribe(
      (endereco) => {
        this.registrarForm.patchValue({
          ['estado']: endereco.uf,
          ['cidade']: endereco.localidade,
          ['inputEndereco']: endereco.logradouro,
        });
        this.registrarForm.controls['estado'].disable();
        this.registrarForm.controls['cidade'].disable();
        this.registrarForm.controls['inputEndereco'].disable();
      },
      (error) => {
        console.log('Erro ao buscar endereço:', error);
      }
    );
  }

  formatarCPF(event: any): void {
    let cpf = event.target.value;
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length > 11) cpf = cpf.slice(0, 11);

    if (cpf.length > 3) {
      cpf = cpf.replace(/(\d{3})/, '$1.');
    }
    if (cpf.length > 7) {
      cpf = cpf.replace(/(\d{3})(\d{3})/, '$1.$2.');
    }
    if (cpf.length > 10) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3-');
    }

    this.cpfInput = cpf;
  }

  handleChangeCreditCard(event: any): void {
    const creditCardValue = event.target.checked;
    this.registrarForm.patchValue({
      cdcredito: creditCardValue,
    });

    if (creditCardValue) {
      this.registrarForm.patchValue({
        boleto: false,
      });
    }
  }

  handleChangeBoleto(event: any): void {
    const boletoValue = event.target.checked;
    this.registrarForm.patchValue({
      boleto: boletoValue,
    });

    if (boletoValue) {
      this.registrarForm.patchValue({
        cdcredito: false,
      });
    }

    if (boletoValue) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Boleto Bancário não está disponível no momento.',
      }).then(() => {
        this.registrarForm.patchValue({
          boleto: false,
        });
      });
    }
  }

  salvar(): void {
    if (this.registrarForm.valid) {
      const clienteData = this.registrarForm.value;
      localStorage.setItem('cliente', JSON.stringify(clienteData));
      this.isCadastrado = true;
      localStorage.setItem('isCadastrado', JSON.stringify(true));

      Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        this.router.navigate(['/listagem']);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, preencha todos os campos corretamente.',
      });
    }
  }
}
