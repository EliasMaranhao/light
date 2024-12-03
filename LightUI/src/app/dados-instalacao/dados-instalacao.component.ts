import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LightService } from '../light.service';
import { Utils } from '../../utils/utilidades';
import { DadosInstalacao, Fatura, Suspensao } from '../../model/dadosInstalacao';

@Component({
  selector: 'app-dados-instalacao',
  standalone: false,
  
  templateUrl: './dados-instalacao.component.html',
  styleUrl: './dados-instalacao.component.css'
})
export class DadosInstalacaoComponent {
  formulario!: FormGroup;
  dadosInstalacao?: DadosInstalacao;

  constructor(private formBuilder: FormBuilder,
              private lightService: LightService){}


  ngOnInit(): void{
    this.configurarFormulario();
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      destino: [null, Validators.required],
      anlage: [null, Validators.required],
      vertrag: [null, Validators.required],
      vkont: [null, Validators.required],
      partner: [null, Validators.required]
    });
  }

  criarRequestBody(){
    let destino = this.formulario.get('destino')?.value;
    let urlDestino = (destino == 'producao' ? Utils.urlProducao : Utils.urlHomologacao);
    urlDestino = urlDestino + Utils.uriObterDadosInstalacao;

    let body = {
      anlage: this.formulario.get('anlage')?.value,
      vertrag: this.formulario.get('vertrag')?.value,
      vkont: this.formulario.get('vkont')?.value,
      partner: this.formulario.get('partner')?.value,
      url: urlDestino,
      destino: destino
    }

    return body;
  }

  enviar(){
    let req = JSON.stringify(this.criarRequestBody());

    this.lightService.enviarRequestDadosInstalacao(req).subscribe({
      next: (response: any)=> {
        this.popularDadosInstalacao(response);
      },
      error: (error: any)=>{
        console.log('Erro ao tentar buscar dados da instalação: ' + error);
      }
    });
  }

  popularDadosInstalacao(response: any){
    var res = response['SOAP:Envelope']['SOAP:Body']['ns1:Z_MT_DADOS_INSTALACAO_RESPONSE'];
    var suspen = res.YE_SUSPENSAO;
    var consumos = res.YT_CONSUMOS;
    var faturas = res.YT_FATURAS;

    this.dadosInstalacao = new DadosInstalacao();
    this.dadosInstalacao.dataProximaLeitura = res.Y_DT_PROX_LEIT;
    this.dadosInstalacao.debitoAutomatico = res.Y_DEB_AUT;
    this.dadosInstalacao.fraude = res.Y_FRAUDE;
    this.dadosInstalacao.liminar = res.Y_LIMINAR;
    this.dadosInstalacao.message = res.Y_MESSAGE;
    this.dadosInstalacao.quantidadeFaturas = res.Y_QTFAT;
    this.dadosInstalacao.retorno = res.Y_RETURN;

    var suspensao = new Suspensao();
    suspensao.discno = suspen.DISCNO;
    suspensao.motivoCorte = suspen.MOT_CORTE;
    suspensao.status = suspen.STATUS;

    this.dadosInstalacao.suspensao = suspensao;
    this.dadosInstalacao.telemed = res.Y_TELEMED;
    this.dadosInstalacao.tipoLigacao = res.Y_TIPO_LIG;
    this.dadosInstalacao.valorFatura = res.Y_VALFAT;

    if(res.YT_FATURAS !== ''){
      this.popularFaturas(faturas.item);
    }
    
  }

  popularFaturas(faturas: any){

    if(Array.isArray(faturas)){
      for(let i=0; i < faturas.length; i++){
        let fatura = new Fatura();
        fatura.betrw = faturas[i].BETRW;
        fatura.codigoBarras = faturas[i].CODBARRAS;
        fatura.dataVencimento = faturas[i].DTVENC;
        fatura.invoice = faturas[i].INVOICE;
        fatura.periodoFatura = faturas[i].BILLING_PERIOD;
        fatura.printdoc = faturas[i].PRINTDOC;
        fatura.tagRetida = faturas[i].TAG_RETIDA;

        this.dadosInstalacao?.faturas.push(fatura);
      }
    }else{
      let fatura = new Fatura();
      fatura.betrw = faturas.BETRW;
      fatura.codigoBarras = faturas.CODBARRAS;
      fatura.dataVencimento = faturas.DTVENC;
      fatura.invoice = faturas.INVOICE;
      fatura.periodoFatura = faturas.BILLING_PERIOD;
      fatura.printdoc = faturas.PRINTDOC;
      fatura.tagRetida = faturas.TAG_RETIDA;

      this.dadosInstalacao?.faturas.push(fatura);
    }
  }
}
