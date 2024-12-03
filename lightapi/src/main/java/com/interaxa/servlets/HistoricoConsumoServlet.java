package com.interaxa.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interaxa.model.HistoricoConsumoDTO;
import com.interaxa.model.ObterDadosInstalacaoDTO;
import com.interaxa.services.HistoricoConsumo;

@WebServlet("/historicoConsumo")
public class HistoricoConsumoServlet extends HttpServlet{
    
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException ,IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Cache-Control", "no-cache");
        ObjectMapper mapper = new ObjectMapper();
        HistoricoConsumoDTO consumoDTO = (HistoricoConsumoDTO)mapper.readValue(request.getInputStream(), HistoricoConsumoDTO.class);
        PrintWriter wr = response.getWriter();
        wr.print(this.executeIdentificaParceiro(consumoDTO));
        wr.flush();
        wr.close();
    }

    private JSONObject executeIdentificaParceiro(HistoricoConsumoDTO consumoDTO){
        String clienteId = "WS_USER_URVV";
        String clientSecret = "homologacao".equals(consumoDTO.getDestino()) ? "P@ssw0rd" : "P@ss21182222";
        String urlUra = consumoDTO.getUrl();
        String dataInicio = consumoDTO.getData_ini();
        String dataFim = consumoDTO.getData_fim();
        String vertrag = consumoDTO.getVertrag();
        String timeoutUra = "5000";
        JSONObject retorno = HistoricoConsumo.executeHistoricoConsumo (clienteId, clientSecret, vertrag, dataInicio, dataFim, urlUra, timeoutUra);
        return retorno;
    }
}
