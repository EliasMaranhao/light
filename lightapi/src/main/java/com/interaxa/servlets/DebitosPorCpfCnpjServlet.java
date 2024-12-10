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
import com.interaxa.model.DebitosPorCpfCnpjDTO;
import com.interaxa.model.HistoricoConsumoDTO;
import com.interaxa.services.DebitosPorCpfCnpj;
import com.interaxa.services.HistoricoConsumo;

@WebServlet("/debitosPorCpfCnpj")
public class DebitosPorCpfCnpjServlet extends HttpServlet{
    
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException ,IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Cache-Control", "no-cache");
        ObjectMapper mapper = new ObjectMapper();
        DebitosPorCpfCnpjDTO debitosDTO = (DebitosPorCpfCnpjDTO)mapper.readValue(request.getInputStream(), DebitosPorCpfCnpjDTO.class);
        PrintWriter wr = response.getWriter();
        wr.print(this.executeDebitoPorCpfCnpj(debitosDTO));
        wr.flush();
        wr.close();
    };

    private JSONObject executeDebitoPorCpfCnpj(DebitosPorCpfCnpjDTO debitosDTO){
        String clienteId = "WS_USER_OUTS";
        String clientSecret = "homologacao".equals(debitosDTO.getDestino()) ? "P@ssw0rd" : "P@ss15212019";
        String urlUra = debitosDTO.getUrl();
        String cpf = debitosDTO.getCpf();
        String cnpj = debitosDTO.getCnpj();
        String timeoutUra = "5000";
        JSONObject retorno =DebitosPorCpfCnpj.executeDebitosPorCpfCnpj(clienteId, clientSecret, urlUra, timeoutUra, cpf, cnpj);
        return retorno;
    }
}
