import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificacaoComponent } from './identificacao/identificacao.component';
import { DadosInstalacaoComponent } from './dados-instalacao/dados-instalacao.component';
import { HistoricoConsumoComponent } from './historico-consumo/historico-consumo.component';
import { PagamentoAndamentoComponent } from './pagamento-andamento/pagamento-andamento.component';

const routes: Routes = [
  {path: 'identificacao', component: IdentificacaoComponent},
  {path: 'dadosInstalacao', component: DadosInstalacaoComponent},
  {path: 'historicoConsumo', component: HistoricoConsumoComponent},
  {path: 'pagamentoProcessamento', component: PagamentoAndamentoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
