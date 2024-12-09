import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fatura, PagamentoProcessamento } from '../../model/pagamentoProcessamento';
import { Utils } from '../../utils/utilidades';
import { LightService } from '../light.service';

@Component({
  selector: 'app-pagamento-andamento',
  standalone: false,
  
  templateUrl: './pagamento-andamento.component.html',
  styleUrl: './pagamento-andamento.component.css'
})
export class PagamentoAndamentoComponent {

  formulario!: FormGroup;
  pagamentoProcessamento?: PagamentoProcessamento;
  message?: string;

  constructor(private formBuilder: FormBuilder, 
              private lightService: LightService){}

  ngOnInit(){
    this.configurarFormulario();
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      destino: [null, Validators.required],
      parceiro: [null, Validators.required],
      tipo: [''],
      contaContrato: [''],
      contrato: [''],
      instalacao: ['']
    });
  }

  criarRequestBody(){
    let destino = this.formulario.get('destino')?.value;
    let urlDestino = (destino == 'producao' ? Utils.uriPagamentoProcessamentoProd : Utils.uriPagamentoProcessamentoHmlg);

    let body = {
      parceiro: this.formulario.get('parceiro')?.value,
      tipo: this.formulario.get('tipo')?.value,
      contaContrato: this.formulario.get('contaContrato')?.value,
      contrato: this.formulario.get('contrato')?.value,
      instalacao: this.formulario.get('instalacao')?.value,
      url: urlDestino,
      destino: destino
    }

    return body;
  }

  enviar(){
    let req = JSON.stringify(this.criarRequestBody());

    this.lightService.enviarRequestPagamentoProcessamento(req).subscribe({
      next: (response: any)=> {
        this.popularPagamentoProcessamento(response);
      },

      error: (error: any) => {
        console.log(error);
      }
    });
  }

  popularPagamentoProcessamento(response: any){
    this.message = undefined;
    this.pagamentoProcessamento = undefined;

    if(response.COD_RETORNO != 0){
      this.message = response.DES_RETORNO;
    }else{
      var faturas = response.E_FATURAS[0].item;
      this.pagamentoProcessamento = new PagamentoProcessamento();

      for(let i=0; i < faturas.length; i++){
        let fatura = new Fatura();
        fatura.parceiro = faturas[i].PARCEIRO;
        fatura.contaContrato = faturas[i].CONTA_CONTRATO;
        fatura.contrato = faturas[i].CONTRATO;
        fatura.instalacao = faturas[i].INSTALACAO;
        fatura.zimpress = faturas[i].ZIMPRESS;
        fatura.billing_period = faturas[i].BILLING_PERIOD;
        fatura.betrw = faturas[i].BETRW;
        fatura.faedn = faturas[i].FAEDN;
        fatura.tipo_pag = faturas[i].TIPO_PAG;
        fatura.agente_arrecadador = faturas[i].AGENTE_ARRECADADOR;
        fatura.data_pagamento = faturas[i].DATA_PAGAMENTO;
        fatura.hora_pagamento = faturas[i].HORA_PAGAMENTO;

        this.pagamentoProcessamento.faturas.push(fatura);
      }

    }
  }
}
