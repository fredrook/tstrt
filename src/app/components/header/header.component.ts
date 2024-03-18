import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isCadastrado: boolean = false;
  showModal: boolean = false;
  clienteData: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const clienteData = localStorage.getItem('cliente');
    this.isCadastrado = clienteData ? true : false;
  }

  logout(): void {
    localStorage.removeItem('cliente');
    this.isCadastrado = false;
    this.router.navigateByUrl('/cadastro');
  }

  modalPerfil(): void {
    this.clienteData = JSON.parse(localStorage.getItem('cliente') || '{}');
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
