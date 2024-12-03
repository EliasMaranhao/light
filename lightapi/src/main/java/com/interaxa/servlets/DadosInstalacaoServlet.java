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
import com.interaxa.model.ObterDadosInstalacaoDTO;
import com.interaxa.services.ObterDadosInstalacao;

@WebServlet("/dadosInstalacao")
public class DadosInstalacaoServlet extends HttpServlet{
    
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Cache-Control", "no-cache");
        ObjectMapper mapper = new ObjectMapper();
        ObterDadosInstalacaoDTO dados = (ObterDadosInstalacaoDTO)mapper.readValue(request.getInputStream(), ObterDadosInstalacaoDTO.class);
        PrintWriter wr = response.getWriter();
        wr.print(this.executeIdentificaParceiro(dados));
        wr.flush();
        wr.close();
   }

    private JSONObject executeIdentificaParceiro(ObterDadosInstalacaoDTO dados) {
        String clienteId = "WS_USER_URVV";
        String clientSecret = "homologacao".equals(dados.getDestino()) ? "P@ssw0rd" : "P@ss21182222";
        String urlUra = dados.getUrl();
        String anlage = dados.getAnlage();
        String vertrag = dados.getVertrag();
        String vkont = dados.getVkont();
        String partner = dados.getPartner();
        String flag_consumos = "";
        String timeoutUra = "5000";
        JSONObject retorno = ObterDadosInstalacao.executeObterDadosInstalacao(clienteId, clientSecret, anlage, vertrag, vkont, partner, flag_consumos, urlUra, timeoutUra);
        return retorno;
   }
}
