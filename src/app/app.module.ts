import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListagemComponent } from './pages/listagem/listagem.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SubHeaderCadastroComponent } from './shared/components/sub-header-cadastro/sub-header-cadastro.component';
import { SubHeaderListagemComponent } from './shared/components/sub-header-listagem/sub-header-listagem.component';
import { ClienteListComponent } from './shared/components/cliente-list/cliente-list.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CPFPipe } from './pipes/mask.service';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, FormsModule],
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
