package com.interaxa.model;

public class PagamentoEmProcessamentoDTO {
    private String parceiro;
    private String tipo;
    private String contaContrato;
    private String contrato;
    private String instalacao;
    private String url;
    private String destino;
    
    public String getParceiro() {
        return parceiro;
    }
    public void setParceiro(String parceiro) {
        this.parceiro = parceiro;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public String getContaContrato() {
        return contaContrato;
    }
    public void setContaContrato(String contaContrato) {
        this.contaContrato = contaContrato;
    }
    public String getContrato() {
        return contrato;
    }
    public void setContrato(String contrato) {
        this.contrato = contrato;
    }
    public String getInstalacao() {
        return instalacao;
    }
    public void setInstalacao(String instalacao) {
        this.instalacao = instalacao;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public String getDestino() {
        return destino;
    }
    public void setDestino(String destino) {
        this.destino = destino;
    }

    
}
