import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LightService } from '../light.service';
import { Utils } from '../../utils/utilidades';
import { HistoricoConsumo, Consumo } from '../../model/historicoConsumo';

@Component({
  selector: 'app-historico-consumo',
  standalone: false,
  
  templateUrl: './historico-consumo.component.html',
  styleUrl: './historico-consumo.component.css'
})
export class HistoricoConsumoComponent {

  formulario!: FormGroup;
  historicoConsumo?: HistoricoConsumo;
  message?: string;

  constructor(private formBuilder: FormBuilder, 
              private lightService: LightService){}


  ngOnInit(){
    this.configurarFormulario();
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      data_ini: [''],
      data_fim: [''],
      vertrag: [null, Validators.required],
      destino: [null, Validators.required]
    });
  }

  criarRequestBody(){
    let destino = this.formulario.get('destino')?.value;
    let urlDestino = (destino == 'producao' ? Utils.urlProducao : Utils.urlHomologacao);
    urlDestino = urlDestino + Utils.uriHistoricoConsumo;

    let body = {
      data_ini: this.formulario.get('data_ini')?.value,
      data_fim: this.formulario.get('data_fim')?.value,
      vertrag: this.formulario.get('vertrag')?.value,
      url: urlDestino,
      destino: destino
    }

    return body;
  }

  enviar(){
    let req = JSON.stringify(this.criarRequestBody());

    this.lightService.enviarRequestHistoricoConsumo(req).subscribe({
      next: (response: any) => {
        this.popularHistoricoConsumo(response);
      },
      error: (error: any) =>{
        console.log(error);
      }
    });
  }

  popularHistoricoConsumo(response: any){
    this.message = undefined;
    this.historicoConsumo = undefined;

    var res = response['SOAP:Envelope']['SOAP:Body']['ns1:Z_MT_HISTORICO_CONSUMO_RESPONSE'];
    var retorno = res.Y_RETURN;

    if(retorno != 0){
      this.message = res.Y_MESSAGE;

    }else{
      var consumos = res.YT_CONSUMOS;
      this.historicoConsumo = new HistoricoConsumo();
      this.historicoConsumo.retorno = retorno;

      if(res.YT_CONSUMOS !== ''){
        if(Array.isArray(res.YT_CONSUMOS.item)){
          let consumos = res.YT_CONSUMOS.item;
  
          for(let i=0; i < consumos.length; i++){
            let consumo = new Consumo();
            consumo.aliq_icms = consumos[i].ALIQ_ICMS;
            consumo.bandeira = consumos[i].BANDEIRA;
            consumo.classe = consumos[i].CLASSE;
            consumo.consumo = consumos[i].CONSUMO;
            consumo.ctg_tarifa = consumos[i].CTG_TARIFA;
            consumo.dias = consumos[i].DIAS;
            consumo.doc_calc = consumos[i].DOC_CALC;
            consumo.doc_impr = consumos[i].DOC_IMPR;
            consumo.flag_bloq = consumos[i].FLAG_BLOQ;
            consumo.flag_fat_nok = consumos[i].FLAG_FAT_NOK;
            consumo.flag_media = consumos[i].FLAG_MEDIA;
            consumo.media_consumo = consumos[i].MEDIA_CONSUMO;
            consumo.media_dia = consumos[i].MEDIA_DIA;
            consumo.mes_ref = consumos[i].MES_REF;
            consumo.nota_leitur = consumos[i].NOTA_LEITUR;
            consumo.tipo_fat = consumos[i].TIPO_FAT;
            consumo.val_consumo = consumos[i].VAL_CONSUMO;
            consumo.val_fatura = consumos[i].VAL_FATURA;
            consumo.valtar = consumos[i].VALTAR;
            consumo.vertrag = consumos[i].VERTRAG;
            
            this.historicoConsumo.consumos.push(consumo);
          }
        }else {
          let consumo = new Consumo();
          consumo.aliq_icms = consumos.ALIQ_ICMS;
          consumo.bandeira = consumos.BANDEIRA;
          consumo.classe = consumos.CLASSE;
          consumo.consumo = consumos.CONSUMO;
          consumo.ctg_tarifa = consumos.CTG_TARIFA;
          consumo.dias = consumos.DIAS;
          consumo.doc_calc = consumos.DOC_CALC;
          consumo.doc_impr = consumos.DOC_IMPR;
          consumo.flag_bloq = consumos.FLAG_BLOQ;
          consumo.flag_fat_nok = consumos.FLAG_FAT_NOK;
          consumo.flag_media = consumos.FLAG_MEDIA;
          consumo.media_consumo = consumos.MEDIA_CONSUMO;
          consumo.media_dia = consumos.MEDIA_DIA;
          consumo.mes_ref = consumos.MES_REF;
          consumo.nota_leitur = consumos.NOTA_LEITUR;
          consumo.tipo_fat = consumos.TIPO_FAT;
          consumo.val_consumo = consumos.VAL_CONSUMO;
          consumo.val_fatura = consumos.VAL_FATURA;
          consumo.valtar = consumos.VALTAR;
          consumo.vertrag = consumos.VERTRAG;
          
          this.historicoConsumo.consumos.push(consumo);
        }
      }
    }

  }
}
