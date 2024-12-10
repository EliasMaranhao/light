import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LightService } from '../light.service';
import { Utils } from '../../utils/utilidades';
import { DebitosCpfCnpj, Fatura } from '../../model/debitosCpfCnpj';

@Component({
  selector: 'app-debitos-cpfcnpj',
  standalone: false,
  
  templateUrl: './debitos-cpfcnpj.component.html',
  styleUrl: './debitos-cpfcnpj.component.css'
})
export class DebitosCpfcnpjComponent {
  formulario!: FormGroup;
  message?: string;
  debitosCpfCnpj?: DebitosCpfCnpj;

  constructor(private formBuilder: FormBuilder, 
              private lightService: LightService){}

  ngOnInit(){
    this.configurarFormulario();
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      cpf: [''],
      cnpj: [''],
      destino: [null, Validators.required]
    });
  }

  criarRequestBody(){
    let destino = this.formulario.get('destino')?.value;
    let urlDestino = '';

    if(destino === 'producao'){
      urlDestino = Utils.urlProducao + Utils.uriDebitosCpfCnpjPrd;
    }else{
      urlDestino = Utils.urlHomologacao + Utils.uriDebitosCpfCnpjHml;
    }

    let body = {
      cpf: this.formulario.get('cpf')?.value,
      cnpj: this.formulario.get('cnpj')?.value,
      url: urlDestino,
      destino: destino
    }

    return body;
  }

  enviar(){
    var req = this.criarRequestBody();
    
    if(req.cpf === '' && req.cnpj == ''){
      alert('Preencha ao menos 1 dos campos');
    }else{
      this.lightService.enviarRequestDebitosPorCpfCnpj(JSON.stringify(req)).subscribe({
        next: (response: any) => {
          this.popularDebitos(response);
        },

        error: (error: any) => {
          console.log('Erro: ' + error);
        }
      });
    }
  }

  popularDebitos(response: any){
    this.message = undefined;
    this.debitosCpfCnpj = undefined;

    var res = response['SOAP:Envelope']['SOAP:Body']['ns1:IdentPNIn_AGV_MT'];

    if(res.Y_ERRO != 0){
      this.message = res.Y_ERRO;
    }else{
      this.message = 'Quantidade de faturas encontradas: ' + res.Y_NUM_DEBITOS +'\n\rTotal de débitos:' + res.Y_TOTAL_DEBITOS;
      this.debitosCpfCnpj = new DebitosCpfCnpj();

      let faturas = res.YT_DETALHES_DEBITOS.item;
      for(let i=0; i < faturas.length; i++){
        let fatura = new Fatura();
        fatura.betrw = faturas[i].BETRW;
        fatura.anlage = faturas[i].ANLAGE;
        fatura.billing_period = faturas[i].BILLING_PERIOD;
        fatura.faedn = faturas[i].FAEDN;
        fatura.gpart = faturas[i].GPART;
        fatura.opbel = faturas[i].OPBEL;
        fatura.vkont = faturas[i].VKONT;
        fatura.vtref = faturas[i].VTREF;
        fatura.waers = faturas[i].WAERS;
        fatura.zimpress = faturas[i].ZIMPRES;

        this.debitosCpfCnpj.detalhes_debitos?.push(fatura);
      }
    }
  }
}
