import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from '../../utils/utilidades';
import { LightService } from '../light.service';
import { Identificacao, Instalacao, Nota } from '../../model/identificacao';

@Component({
  selector: 'app-identificacao',
  standalone: false,
  
  templateUrl: './identificacao.component.html',
  styleUrl: './identificacao.component.css'
})
export class IdentificacaoComponent {

  formulario!: FormGroup;
  identificacao?: Identificacao;

  constructor(private formBuilder: FormBuilder, 
              private lightService: LightService){}

  ngOnInit(): void {
    this.configurarFormulario();
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      destino: [null, Validators.required],
      identificador: [null, Validators.required],
      tipoIdentificacao: [null, Validators.required]
    });
  }

  criarRequestBody(){
    let destino = this.formulario.get('destino')?.value;
    let urlDestino = (destino == 'producao' ? Utils.urlProducao : Utils.urlHomologacao);
    urlDestino = urlDestino + Utils.uriIdentificaParceiro;

    let body = {
      identificador: this.formulario.get('identificador')?.value,
      destino: this.formulario.get('destino')?.value,
      tipoIdentificacao: this.formulario.get('tipoIdentificacao')?.value,
      url: urlDestino
    }

    return body;
  }

  enviar(){
    let req = JSON.stringify(this.criarRequestBody());

    this.lightService.enviarRequestIdentificacao(req).subscribe({
      next: (response: any) => {
        this.popularIdentificacao(response)
        console.log(response);
      },

      error: (error: any) => {
        console.log(error);
      }
    });
  }

  popularIdentificacao(response: any){
    this.identificacao = new Identificacao();
    var res = response['SOAP:Envelope']['SOAP:Body']['ns1:Z_MT_VERIF_PN_INSTAL_RESPONSE'];
    var instalacoes = res.YT_INSTALS.item;
    var notas = res.YT_NOTAS;

    this.identificacao.cpf_cnpj = res.Y_CPF_CNPJ;

    if(res.Y_QTINST !== '0000'){
      this.popularInstalacoes(instalacoes);
    }
    
    if(res.YT_NOTAS !== ''){
      this.popularNotas(notas.item);
    }

    this.identificacao.message = res.Y_MESSAGE;
    this.identificacao.nome = res.Y_NOME;
    this.identificacao.partner = res.Y_PARTNER;
    this.identificacao.partner_guid = res.Y_PARTNER_GUID;
    this.identificacao.qinst = res.Y_QTINST;
    this.identificacao.retorno = res.Y_RETURN;
    this.identificacao.tel_ger = res.Y_TEL_GER;
    this.identificacao.tipoCliente = res.Y_TP_CLIENTE;
  }

  popularInstalacoes(instalacoes: any){

    if(Array.isArray(instalacoes)){
      for(let i=0; i < instalacoes.length; i++){
        let instalacao = new Instalacao();
        instalacao.anlage = instalacoes[i].ANLAGE;
        instalacao.bairro = instalacoes[i].BAIRRO;
        instalacao.celular = instalacoes[i].CELULAR;
        instalacao.cep = instalacoes[i].CEP;
        instalacao.cidade = instalacoes[i].CIDADE;
        instalacao.cod_bairro = instalacoes[i].COD_BAIRRO;
        instalacao.cod_cidade = instalacoes[i].COD_CIDADE;
        instalacao.cod_rua = instalacoes[i].COD_RUA;
        instalacao.dt_ligacao = instalacoes[i].DT_LIGACAO;
        instalacao.email = instalacoes[i].EMAIL;
        instalacao.endereco = instalacoes[i].ENDERECO;
        instalacao.rua = instalacoes[i].RUA;
        instalacao.vertrag = instalacoes[i].VERTRAG;
        instalacao.vkont = instalacoes[i].VKONT;
        instalacao.tp_instal = instalacoes[i].TP_INSTAL;

        this.identificacao?.instalacoes?.push(instalacao)
      }
    }else{
        let instalacao = new Instalacao();

        instalacao.anlage = instalacoes.ANLAGE;
        instalacao.bairro = instalacoes.BAIRRO;
        instalacao.celular = instalacoes.CELULAR;
        instalacao.cep = instalacoes.CEP;
        instalacao.cidade = instalacoes.CIDADE;
        instalacao.cod_bairro = instalacoes.COD_BAIRRO;
        instalacao.cod_cidade = instalacoes.COD_CIDADE;
        instalacao.cod_rua = instalacoes.COD_RUA;
        instalacao.dt_ligacao = instalacoes.DT_LIGACAO;
        instalacao.email = instalacoes.EMAIL;
        instalacao.endereco = instalacoes.ENDERECO;
        instalacao.rua = instalacoes.RUA;
        instalacao.vertrag = instalacoes.VERTRAG;
        instalacao.vkont = instalacoes.VKONT;
        instalacao.tp_instal = instalacoes.TP_INSTAL;

        this.identificacao?.instalacoes?.push(instalacao)
    }
  }

  popularNotas(notas: any){

    if(Array.isArray(notas)){
      for(let i=0; i < notas.length; i++){
        let nota = new Nota();
        nota.anlage = notas[i].ANLAGE;
        nota.ausbs = notas[i].AUSBS;
        nota.auztb = notas[i].AUZTB;
        nota.fecod = notas[i].FECOD;
        nota.fegrp = notas[i].FEGRP;
        nota.ltrmn = notas[i].LTRMN;
        nota.ltrur = notas[i].LTRUR;
        nota.mncod = notas[i].MNCOD;
        nota.mngrp = notas[i].MNGRP;
        nota.qmart = notas[i].QMART;
        nota.qmdat = notas[i].QMDAT;
        nota.qmnum = notas[i].QMNUM;
        nota.status = notas[i].STATUS;

        this.identificacao?.notas?.push(nota);
      }
    }else{
      let nota = new Nota();
      nota.anlage = notas.ANLAGE;
      nota.ausbs = notas.AUSBS;
      nota.auztb = notas.AUZTB;
      nota.fecod = notas.FECOD;
      nota.fegrp = notas.FEGRP;
      nota.ltrmn = notas.LTRMN;
      nota.ltrur = notas.LTRUR;
      nota.mncod = notas.MNCOD;
      nota.mngrp = notas.MNGRP;
      nota.qmart = notas.QMART;
      nota.qmdat = notas.QMDAT;
      nota.qmnum = notas.QMNUM;
      nota.status = notas.STATUS;

      this.identificacao?.notas?.push(nota);
    }
  }
}
