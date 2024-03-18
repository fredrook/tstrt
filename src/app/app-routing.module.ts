import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ListagemComponent } from './pages/listagem/listagem.component';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CadastroGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const clienteData = localStorage.getItem('cliente');
    if (clienteData) {
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Acesso Negado',
        text: 'Você precisa estar cadastrado para acessar o campo Lista.',
      }).then(() => {
        this.router.navigate(['/cadastro']);
      });
      return false;
    }
  }
}

const routes: Routes = [
  { path: '', redirectTo: '/cadastro', pathMatch: 'full' },
  { path: 'cadastro', component: CadastroComponent },
  {
    path: 'listagem',
    component: ListagemComponent,
    canActivate: [CadastroGuard],
  }, // Use o guard de rota
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
