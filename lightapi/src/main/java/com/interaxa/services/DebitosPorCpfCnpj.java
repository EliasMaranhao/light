package com.interaxa.services;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;

import org.json.JSONObject;
import org.json.XML;

public class DebitosPorCpfCnpj {

    public static JSONObject executeDebitosPorCpfCnpj(String clientIdUra, String clientSecretUra, String urlUra, String timeoutUra, String cpfUra, String cnpjUra){
        JSONObject retorno = null;

        try{
            String clientId = clientIdUra;
            String clientSecret = clientSecretUra;
            String url = urlUra;
            int timeout = Integer.parseInt(timeoutUra);
            String cpf = cpfUra;
            String cnpj = cnpjUra;
            String auth = clientId + ":" + clientSecret;
            String authentication = Base64.getEncoder().encodeToString(auth.getBytes());

            URL obj = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) obj.openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            connection.setConnectTimeout(timeout);
			connection.setRequestProperty("Content-Type", "text/xml; charset=utf-8");
			connection.setRequestProperty("Authorization", "Basic " + authentication);

            String xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:atc=\"http://aia/ccs/atca008\">\r\n" +
                         "  <soapenv:Header/>\r\n" +
                         "  <soapenv:Body>\r\n" +
                         "      <atc:IdentPNOut_AGV_MT>\r\n" +
                         "          <X_CPF>"+cpf+"</X_CPF>\r\n" +
                         "          <X_CNPJ>"+cnpj+"</X_CNPJ>\r\n" +
                         "          <X_EXECUCAO>\r\n" +
                         "              <DEBITOS>X</DEBITOS>\r\n" +
                         "          </X_EXECUCAO>\n\r" +
                         "          <X_DEBITOS_A_VENCER>X</X_DEBITOS_A_VENCER>\n\r" +
                         "      </atc:IdentPNOut_AGV_MT>\n\r" +
                         "  </soapenv:Body>\n\r" +
                         "</soapenv:Envelope>";

            DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
            wr.writeBytes(xml);
            wr.flush();
            wr.close();

            String responseStatus = connection.getResponseMessage();

            int responseError = connection.getResponseCode();

            if (responseError != 200) {
				   throw new IOException(
				     "Error HTTP Status: " + connection.getResponseCode() +" "+ connection.getResponseMessage());
			}

            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
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
        }catch (IOException er) {
			JSONObject json = XML.toJSONObject(er.toString());			
			retorno = json;	
			retorno = retorno.append("Erro:", er.toString());		
			
		} catch (Exception con) {
			con.getMessage();
			JSONObject json = XML.toJSONObject(con.toString());			
			retorno = json;	
			retorno = retorno.append("Erro:", con.toString());
		}
		return retorno;
    }
}
