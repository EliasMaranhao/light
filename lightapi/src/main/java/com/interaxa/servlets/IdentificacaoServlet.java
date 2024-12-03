package com.interaxa.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interaxa.model.IdentificacaoParceiroDTO;
import com.interaxa.services.IdentificacaoParceiro;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

@WebServlet("/identificacaoParceiro")
public class IdentificacaoServlet extends HttpServlet{
    
   protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      response.setContentType("application/json");
      response.setCharacterEncoding("UTF-8");
      response.setHeader("Cache-Control", "no-cache");
      ObjectMapper mapper = new ObjectMapper();
      IdentificacaoParceiroDTO identificacao = (IdentificacaoParceiroDTO)mapper.readValue(request.getInputStream(), IdentificacaoParceiroDTO.class);
      PrintWriter wr = response.getWriter();
      wr.print(this.executeIdentificaParceiro(identificacao));
      wr.flush();
      wr.close();
   }

    private JSONObject executeIdentificaParceiro(IdentificacaoParceiroDTO identificacao) {

      String clienteId = "WS_USER_URVV";
      String clientSecret = "homologacao".equals(identificacao.getDestino()) ? "P@ssw0rd" : "P@ss21182222";
      String opcao = "";
      String partner = "";
      String anlage = "";
      String telefone = "";
      String cpf = "";
      String cnpj = "";
      String dt_notas = "";
      String max_instals = "";
      String timeoutUra = "5000";
      String urlUra = identificacao.getUrl();

      if ("telefone".equals(identificacao.getTipoIdentificacao())) {
         telefone = identificacao.getIdentificador();
         opcao = "1";
      } else if ("instalacao".equals(identificacao.getTipoIdentificacao())) {
         anlage = identificacao.getIdentificador();
         opcao = "1";
         if (anlage.length() == 9) {
            anlage = "0" + anlage;
         }
      } else if ("cpf".equals(identificacao.getTipoIdentificacao())) {
         cpf = identificacao.getIdentificador();
         opcao = "1";
      } else if ("cnpj".equals(identificacao.getTipoIdentificacao())) {
         cnpj = identificacao.getIdentificador();
         opcao = "1";
      }

      JSONObject retorno = IdentificacaoParceiro.executeIdentificacaoParceiro(clienteId, clientSecret, opcao, partner, anlage, telefone, cpf, cnpj, dt_notas, max_instals, urlUra, timeoutUra);
      return retorno;
   }
}
