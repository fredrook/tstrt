import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})
export class ClienteListComponent implements OnInit {
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  cpfInput: string = '';
  criadoEmInput: string = '';
  nomePesquisado: string = ''; // Adicionando uma propriedade para armazenar o nome pesquisado

  constructor() {}

  ngOnInit(): void {}

  incluirCliente(): void {
    // Obter os valores dos campos de entrada
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

    // Criar um novo objeto cliente
    const novoCliente = {
      nome: nome,
      email: email,
      cpf: cpf,
      criadoEm: criadoEm,
    };

    // Adicionar o novo cliente ao array de clientes
    this.clientes.push(novoCliente);

    // Salvar os clientes no localStorage
    localStorage.setItem('clientes', JSON.stringify(this.clientes));

    // Limpar os campos de entrada
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
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cpf.length > 11) cpf = cpf.slice(0, 11); // Limita o CPF a 11 dígitos

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
    data = data.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Verifica se a data possui o formato esperado
    if (data.length === 8) {
      // Formata a data com a máscara dd/MM/yyyy
      data =
        data.substring(0, 2) +
        '/' +
        data.substring(2, 4) +
        '/' +
        data.substring(4);
    } else if (data.length > 8) {
      // Se o comprimento for maior que 8, apaga o último caractere
      data = data.substring(0, 8);
      // Atualiza o valor do campo de entrada com a máscara dd/MM/yyyy
      data =
        data.substring(0, 2) +
        '/' +
        data.substring(2, 4) +
        '/' +
        data.substring(4);
    }

    // Atualiza o valor do campo de entrada
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

    // Abre um modal de edição com os campos preenchidos
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
        const cpf = (<HTMLInputElement>document.getElementById('cpf')).value;
        const criadoEm = (<HTMLInputElement>document.getElementById('criadoEm'))
          .value;

        // Aqui você pode implementar a lógica para validar e salvar as edições
        // Por exemplo, validar se os campos estão preenchidos corretamente

        // Atualiza os dados do cliente no array
        cliente.nome = nome;
        cliente.email = email;
        cliente.cpf = cpf;
        cliente.criadoEm = criadoEm;

        // Atualiza o localStorage com os novos dados
        localStorage.setItem('clientes', JSON.stringify(this.clientes));

        Swal.fire({
          icon: 'success',
          title: 'Cliente atualizado!',
          text: 'Os dados do cliente foram atualizados com sucesso.',
        });
      },
    });
  }

  excluirCliente(cliente: any) {
    // Exibir o alerta de confirmação para exclusão do cliente
    Swal.fire({
      icon: 'warning',
      title: 'Exclusão de Cliente',
      text: `Tem certeza que deseja excluir o cliente: ${cliente.nome}?`,
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Verificar se o cliente está presente no array de clientes
        const index = this.clientes.indexOf(cliente);
        if (index !== -1) {
          // Remover o cliente do array de clientes
          this.clientes.splice(index, 1);

          // Atualizar o localStorage com o novo array de clientes
          localStorage.setItem('clientes', JSON.stringify(this.clientes));

          // Exibir mensagem de sucesso
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
