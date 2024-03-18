import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListagemComponent } from './pages/listagem/listagem.component';
import { HeaderComponent } from './components/header/header.component';
import { SubHeaderCadastroComponent } from './components/sub-header-cadastro/sub-header-cadastro.component';
import { SubHeaderListagemComponent } from './components/sub-header-listagem/sub-header-listagem.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CPFPipe } from './pipes/mask.service';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CadastroClienteComponent } from './components/cadastro-cliente/cadastro-cliente.component';
import { ValidadorCEPService } from './service/validadorCEP.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    ListagemComponent,
    HeaderComponent,
    SubHeaderCadastroComponent,
    SubHeaderListagemComponent,
    FooterComponent,
    CPFPipe,
    ClienteListComponent,
    CadastroComponent,
    CadastroClienteComponent,
    
  ],
  providers: [ValidadorCEPService],
  bootstrap: [AppComponent],
})
export class AppModule {}
