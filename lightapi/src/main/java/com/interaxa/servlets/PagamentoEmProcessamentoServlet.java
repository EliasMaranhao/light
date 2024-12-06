package com.interaxa.servlets;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interaxa.model.PagamentoEmProcessamentoDTO;
import com.interaxa.services.PagamentoEmProcessamento;

@WebServlet("/pagamentoEmProcessamento")
public class PagamentoEmProcessamentoServlet extends HttpServlet{

    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Cache-Control", "no-cache");
        ObjectMapper mapper = new ObjectMapper();
        PagamentoEmProcessamentoDTO pagamentoEmProcessamentoDTO = (PagamentoEmProcessamentoDTO)mapper.readValue(request.getInputStream(), PagamentoEmProcessamentoDTO.class);
        PrintWriter wr = response.getWriter();
        wr.print(this.executePagamentoEmProcessamento(pagamentoEmProcessamentoDTO));
        wr.flush();
        wr.close();
    }

    private JSONObject executePagamentoEmProcessamento(PagamentoEmProcessamentoDTO pagamentoEmProcessamentoDTO){
        String clienteId = "WS_USER_URVV";
        String clientSecret = "homologacao".equals(pagamentoEmProcessamentoDTO.getDestino()) ? "P@ssw0rd" : "P@ss21182222";
        String urlUra = pagamentoEmProcessamentoDTO.getUrl();
        String parceito = pagamentoEmProcessamentoDTO.getParceiro();
        String tipo = pagamentoEmProcessamentoDTO.getTipo();
        String contaContrato = pagamentoEmProcessamentoDTO.getContaContrato();
        String contrato = pagamentoEmProcessamentoDTO.getContrato();
        String instalacao = pagamentoEmProcessamentoDTO.getInstalacao();
        String timeoutUra = "8000";

        JSONObject retorno = PagamentoEmProcessamento.executePagamentoEmAndamento(clienteId, clientSecret, parceito, tipo, contaContrato, contrato, instalacao, timeoutUra, urlUra);
        return retorno;
    }
}
