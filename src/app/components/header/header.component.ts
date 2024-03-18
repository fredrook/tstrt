import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isCadastrado: boolean = false;

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
}
