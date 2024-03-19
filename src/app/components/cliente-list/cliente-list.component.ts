import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})
export class ClienteListComponent implements OnInit, AfterViewInit {
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  cpfInput: string = '';
  criadoEmInput: string = '';
  nomePesquisado: string = '';

  constructor() {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    const storedClientes = localStorage.getItem('clientes');
    if (storedClientes) {
      this.clientes = JSON.parse(storedClientes);
      this.clientesFiltrados = [...this.clientes];
    }
  }

  ngAfterViewInit(): void {
    const cpfInput = document.getElementById('cpfInput') as HTMLInputElement;
    if (cpfInput) {
      cpfInput.addEventListener('input', () => {
        let cpf = cpfInput.value;
        cpf = cpf.replace(/\D/g, '');

        if (cpf.length > 11) cpf = cpf.slice(0, 11);

        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');

        if (cpf.length > 14) cpf = cpf.slice(0, 14);

        cpfInput.value = cpf;
      });
    }
  }

  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  incluirCliente(): void {
    const nome = (<HTMLInputElement>document.getElementById('nomeInput')).value;
    const email = (<HTMLInputElement>document.getElementById('emailInput'))
      .value;
    const cpf = (<HTMLInputElement>document.getElementById('cpfInput')).value;
    const criadoEm = (<HTMLInputElement>(
      document.getElementById('criadoEmInput')
    )).value;

    if (!nome || !email || !cpf || !criadoEm) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, preencha todos os campos!',
      });
      return;
    }

    if (!this.validarEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email inválido!',
      });
      return;
    }

    if (!cpf || cpf.length < 11) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'CPF não pode ter menos do que 11 números!',
      });
      return;
    }

    if (!cpf || cpf.length > 14) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'CPF não pode ter mais do que 11 números!',
      });
      return;
    }

    if (criadoEm.length > 10) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Data inválida!',
      });
      return;
    }

    const novoCliente = {
      nome: nome,
      email: email,
      cpf: cpf,
      criadoEm: criadoEm,
    };

    this.clientes.push(novoCliente);

    localStorage.setItem('clientes', JSON.stringify(this.clientes));

    (<HTMLInputElement>document.getElementById('nomeInput')).value = '';
    (<HTMLInputElement>document.getElementById('emailInput')).value = '';
    (<HTMLInputElement>document.getElementById('cpfInput')).value = '';
    (<HTMLInputElement>document.getElementById('criadoEmInput')).value = '';

    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Cliente adicionado com sucesso!',
    });
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

  formatarData(event: any): void {
    let data = event.target.value;
    data = data.replace(/\D/g, '');

    if (data.length === 8) {
      data =
        data.substring(0, 2) +
        '/' +
        data.substring(2, 4) +
        '/' +
        data.substring(4);
    } else if (data.length > 8) {
      data = data.substring(0, 8);
      data =
        data.substring(0, 2) +
        '/' +
        data.substring(2, 4) +
        '/' +
        data.substring(4);
    }

    event.target.value = data;

    this.criadoEmInput = data;
  }

  buscarCliente(): void {
    const nome = this.nomePesquisado.toLowerCase();

    if (!nome) {
      const storedClientes = localStorage.getItem('clientes');
      if (storedClientes) {
        this.clientes = JSON.parse(storedClientes);
        this.clientesFiltrados = [...this.clientes];
      } else {
        this.clientesFiltrados = [...this.clientes];
      }
      return;
    }

    this.clientesFiltrados = this.clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(nome)
    );
    this.clientes = this.clientesFiltrados;
  }

  editarDados(indice: number): void {
    const cliente = this.clientes[indice];

    Swal.fire({
      title: 'Editar Cliente',
      html: `
      <input id="nome" class="swal2-input" value="${cliente.nome}" placeholder="Nome">
      <input id="email" class="swal2-input" value="${cliente.email}" placeholder="Email">
      <input id="cpf" class="swal2-input" value="${cliente.cpf}" placeholder="CPF">
      <input id="criadoEm" class="swal2-input" value="${cliente.criadoEm}" placeholder="Data de Criação (DD/MM/AAAA)">
    `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nome = (<HTMLInputElement>document.getElementById('nome')).value;
        const email = (<HTMLInputElement>document.getElementById('email'))
          .value;
        let cpf = (<HTMLInputElement>document.getElementById('cpf')).value;
        let criadoEm = (<HTMLInputElement>document.getElementById('criadoEm'))
          .value;

        if (!nome || !email || !cpf || !criadoEm) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos!',
          });
          return false;
        }

        if (!this.validarEmail(email)) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email inválido!',
          });
          return false;
        }

        cpf = cpf.replace(/\D/g, '');

        if (cpf.length !== 11) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'CPF deve conter 11 números!',
          });
          return false;
        }

        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(criadoEm)) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Data inválida! Utilize o formato DD/MM/AAAA',
          });
          return false;
        }

        cliente.nome = nome;
        cliente.email = email;
        cliente.cpf = cpf;
        cliente.criadoEm = criadoEm;

        localStorage.setItem('clientes', JSON.stringify(this.clientes));

        Swal.fire({
          icon: 'success',
          title: 'Cliente atualizado!',
          text: 'Os dados do cliente foram atualizados com sucesso.',
        });
        return true;
      },
    });
  }

  excluirCliente(cliente: any) {
    Swal.fire({
      icon: 'warning',
      title: 'Exclusão de Cliente',
      text: `Tem certeza que deseja excluir o cliente: ${cliente.nome}?`,
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.clientes.indexOf(cliente);
        if (index !== -1) {
          this.clientes.splice(index, 1);

          localStorage.setItem('clientes', JSON.stringify(this.clientes));

          Swal.fire({
            icon: 'success',
            title: 'Cliente excluído!',
            text: 'O cliente foi excluído com sucesso.',
          });
        }
      }
    });
  }
}
