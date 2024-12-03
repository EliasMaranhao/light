package com.interaxa.model;

public class IdentificacaoParceiroDTO {
    private String identificador;
    private String url;
    private String tipoIdentificacao;
    private String destino;
 
    public IdentificacaoParceiroDTO() {
    }
 
    public String getDestino() {
       return this.destino;
    }
 
    public void setDestino(String destino) {
       this.destino = destino;
    }
 
    public String getIdentificador() {
       return this.identificador;
    }
 
    public void setIdentificador(String identificador) {
       this.identificador = identificador;
    }
 
    public String getUrl() {
       return this.url;
    }
 
    public void setUrl(String url) {
       this.url = url;
    }
 
    public String getTipoIdentificacao() {
       return this.tipoIdentificacao;
    }
 
    public void setTipoIdentificacao(String tipoIdentificacao) {
       this.tipoIdentificacao = tipoIdentificacao;
    }
}
