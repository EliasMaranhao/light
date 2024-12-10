import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LightService {
  
  url_identificacao =    'http://172.22.52.65:8080/lightapi/identificacaoParceiro';
  url_dadosInstalacao =  'http://172.22.52.65:8080/lightapi/dadosInstalacao';
  url_historicoConsumo = 'http://172.22.52.65:8080/lightapi/historicoConsumo';
  url_pagamentoProcessamento = 'http://172.22.52.65:8080/lightapi/pagamentoEmProcessamento';
  url_debitosPorCpfCnpj = 'http://172.22.52.65:8080/lightapi/debitosPorCpfCnpj';

  constructor(private http:HttpClient) { }

  enviarRequestIdentificacao(request: string): any{
    return this.http.post<string>(this.url_identificacao, request);
  }
   
  enviarRequestDadosInstalacao(request: string): any{
    return this.http.post<string>(this.url_dadosInstalacao, request);
  }

  enviarRequestHistoricoConsumo(request: string): any{
    return this.http.post<string>(this.url_historicoConsumo, request);
  }

  enviarRequestPagamentoProcessamento(request: string): any{
    return this.http.post<string>(this.url_pagamentoProcessamento, request);
  }

  enviarRequestDebitosPorCpfCnpj(request: string): any{
    return this.http.post<string>(this.url_debitosPorCpfCnpj, request);
  }
}
