import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { provideHttpClient } from '@angular/common/http';
import { IdentificacaoComponent } from './identificacao/identificacao.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DadosInstalacaoComponent } from './dados-instalacao/dados-instalacao.component';
import { HistoricoConsumoComponent } from './historico-consumo/historico-consumo.component';
import { PagamentoAndamentoComponent } from './pagamento-andamento/pagamento-andamento.component';
import { DebitosCpfcnpjComponent } from './debitos-cpfcnpj/debitos-cpfcnpj.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    IdentificacaoComponent,
    DadosInstalacaoComponent,
    HistoricoConsumoComponent,
    PagamentoAndamentoComponent,
    DebitosCpfcnpjComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
