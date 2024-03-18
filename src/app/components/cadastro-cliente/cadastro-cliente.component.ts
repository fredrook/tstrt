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
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$'
          ),
        ],
      ],
      cpf: [
        null,
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.maxLength(11),
        ],
      ],
      cep: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      estado: [''],
      inputEndereco: [''],
      cidade: [''],
      cdcredito: [false],
      boleto: [false],
      nomeCard:  [null, Validators.pattern('[^0-9]*')],
      dataExpiracao: [null, Validators.required],
      ano: [null, Validators.required],
      numbCard: [
        null,
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.maxLength(16),
        ],
      ],
      codSeg: [
        null,
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.maxLength(4),
        ],
      ],
    });
  }

  @ViewChild('inputCEP') inputCEP!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 10; year++) {
      this.years.push(year);
    }

    this.registrarForm.get('estado')?.disable();
    this.registrarForm.get('inputEndereco')?.disable();
    this.registrarForm.get('cidade')?.disable();
  }

  ngAfterViewInit(): void {
    if (this.inputCEP) {
      this.inputCEP.nativeElement.addEventListener('input', () => {
        let cepValue: string = this.inputCEP.nativeElement.value;
        cepValue = cepValue.replace(/\D/g, '');
        this.registrarForm.patchValue({
          cep: cepValue,
        });
      });
    }

    const cpfInput = this.registrarForm.get('cpf');
    if (cpfInput) {
      cpfInput.valueChanges.subscribe((value) => {
        let cpfValue: string = value.replace(/\D/g, '');
        if (cpfValue.length > 11) {
          cpfValue = cpfValue.slice(0, 11);
        }
        this.registrarForm.patchValue({
          cpf: cpfValue,
        });
      });
    }

    const cepInput = this.registrarForm.get('cep');
    if (cepInput) {
      cepInput.valueChanges.subscribe((value) => {
        let cepValue: string = value.replace(/\D/g, '');
        this.registrarForm.patchValue({
          cep: cepValue,
        });
      });
    }

    const numbCardInput = this.registrarForm.get('numbCard');
    if (numbCardInput) {
      numbCardInput.valueChanges.subscribe((value) => {
        let cardNumber: string = value.replace(/\D/g, '');
        if (cardNumber.length > 16) {
          cardNumber = cardNumber.slice(0, 16);
        }
        this.registrarForm.patchValue({
          numbCard: cardNumber,
        });
      });
    }

    const codSegInput = this.registrarForm.get('codSeg');
    if (codSegInput) {
      codSegInput.valueChanges.subscribe((value) => {
        let codSegNumber: string = value.replace(/\D/g, '');
        if (codSegNumber.length > 4) {
          codSegNumber = codSegNumber.slice(0, 4);
        }
        this.registrarForm.patchValue({
          codSeg: codSegNumber,
        });
      });
    }

    const nomeCardInput = this.registrarForm.get('nomeCard');
  if (nomeCardInput) {
    nomeCardInput.valueChanges.subscribe((value) => {
      let nomeCardValue: string = value.replace(/[0-9]/g, '');
      this.registrarForm.patchValue({
        nomeCard: nomeCardValue,
      });
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
    const cdCreditoChecked = this.registrarForm.get('cdcredito')?.value;
    const boletoChecked = this.registrarForm.get('boleto')?.value;
  
    if (!cdCreditoChecked && !boletoChecked) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, selecione pelo menos uma forma de pagamento.',
      });
      return;
    }
  
    if (this.registrarForm.valid) {
      const clienteData = this.registrarForm.value;
      localStorage.setItem('cliente', JSON.stringify(clienteData));
      this.isCadastrado = true;
      localStorage.setItem('isCadastrado', JSON.stringify(true));
  
      Swal.fire({
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        this.router.navigate(['/listagem']);
      });
    } else {
      let errorMessage = 'Por favor, preencha todos os campos corretamente:\n';
      Object.keys(this.registrarForm.controls).forEach(field => {
        const control = this.registrarForm.get(field);
        if (control && control.errors) {
          const errors = control.errors;
          Object.keys(errors).forEach(keyError => {
            switch (keyError) {
              case 'required':
                errorMessage += `- O campo ${field} é obrigatório.\n`;
                break;
              case 'pattern':
                errorMessage += `- O campo ${field} não está no formato correto.\n`;
                break;
              case 'maxlength':
                errorMessage += `- O campo ${field} excede o limite de caracteres.\n`;
                break;
              default:
                errorMessage += `- ${errors[keyError]}\n`;
                break;
            }
          });
        }
      });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      });
    }
  }
  
  
}
