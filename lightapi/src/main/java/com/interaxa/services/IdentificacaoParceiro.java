package com.interaxa.services;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;

public class IdentificacaoParceiro {
    
    public static JSONObject executeIdentificacaoParceiro(String clientIdUra, String clientSecretUra, String x_opcao, String x_partner, String x_anlage, String x_telefone, String x_cpf , String x_cnpj, String x_dt_notas, String x_max_instals, String urlUra, String timeoutUra) throws JSONException{
        JSONObject retorno = null;

        try {
            String clientId = clientIdUra; //"WS_USER_URVV";// clientId
            String clientSecret = clientSecretUra; // "P@ssw0rd";// client secret
            String auth = clientId + ":" + clientSecret;
            String authentication = Base64.getEncoder().encodeToString(auth.getBytes());
            String opcao = x_opcao; // 1 para pesquisar cliente, ou 3 para verificar se instala��o � do cliente
			String partner = x_partner; // Numero do cliente			
			String anlage = x_anlage; // Numero do cliente
			String telefone = x_telefone; // Numero do telefone no formato DDNNNNNNNNN
			String cpf = x_cpf; // N�mero do CPF
			String cnpj = x_cnpj; // N�mero do CNPJ
			String dt_notas = x_dt_notas; // Data de refer�ncia para busca das notas de servi�o do cliente. Em produ��o n�o dever� ser preenchido, assume a data corrente. No ambiente de qualidade pode ser informada uma data passada
			String max_instals = x_max_instals; // N�mero m�ximo de instala��es do cliente a serem devolvidas. N�o deve ser preenchido, assume-se 5 instala��es.
			int timeout = Integer.parseInt(timeoutUra);

            String url = urlUra; //"http://ssqplci.light.com.br:50200/XISOAPAdapter/MessageServlet?channel=:BS_URA_VV_QUA:Z_CC_URA_VV_INCLUI_PROT_DECRETO_CRM_SOAP_SENDER&version=3.0&Sender.Service=BS_URA_VV_QUA&Interface=http://www.light.com.br/ura/inclui_prot_decreto_crm^Z_MI_INCLUI_PROT_DECRETO_CRM_OUTBD_SYNC";
			URL obj = new URL(url);
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();
			con.setRequestMethod("POST");
			con.setDoOutput(true);
			con.setConnectTimeout(timeout);
			con.setRequestProperty("Content-Type", "text/xml; charset=utf-8");
			con.setRequestProperty("Authorization", "Basic " + authentication);

            String xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ver=\"http://www.light.com.br/ura/verif_pn_instal\">"
						 + "<soapenv:Header/>"
						 + "<soapenv:Body>"
						 + "<ver:Z_MT_VERIF_PN_INSTAL_REQUEST>"
						 + "<X_DT_NOTAS>"+dt_notas+"</X_DT_NOTAS>"
						 + "<X_MAX_INSTALS>"+max_instals+"</X_MAX_INSTALS>"
						 + "<X_ANLAGE>"+anlage+"</X_ANLAGE>"
						 + "<X_CNPJ>"+cnpj+"</X_CNPJ>"
						 + "<X_CPF>"+cpf+"</X_CPF>"
						 + "<X_OPCAO>"+opcao+"</X_OPCAO>"
						 + "<X_PARTNER>"+partner+"</X_PARTNER>"
						 + "<X_TELEFONE>"+telefone+"</X_TELEFONE>"
						 + "</ver:Z_MT_VERIF_PN_INSTAL_REQUEST>"
						 + "</soapenv:Body>"
						 + "</soapenv:Envelope>";

            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            //System.out.println("url: " + url + " xml: " + xml);
			wr.writeBytes(xml);
			wr.flush();
			wr.close();
			String responseStatus = con.getResponseMessage();
			//System.out.println(responseStatus);

            int responseError = con.getResponseCode();			
			//System.out.println(responseError);	

            if (responseError != 200) {
                throw new IOException(
                  "Error HTTP Status: " + con.getResponseCode() +" "+ con.getResponseMessage());
            }

            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
			StringBuffer response = new StringBuffer();
			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();
			JSONObject json = XML.toJSONObject(response.toString());
			//System.out.println("Response XML:" + response.toString());
			//System.out.println("Xml transformado em Json: " + json);
			retorno = json;

        } catch (IOException er) {
            JSONObject json = XML.toJSONObject(er.toString());			
			retorno = json;	
			retorno = retorno.append("Erro:", er.toString());
        }catch (Exception con) {
			con.getMessage();
			JSONObject json = XML.toJSONObject(con.toString());			
			retorno = json;	
			retorno = retorno.append("Erro:", con.toString());
		}
        return retorno;
    }
}
