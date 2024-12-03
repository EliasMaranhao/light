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

public class HistoricoConsumo {
	
	public static JSONObject executeHistoricoConsumo (String clientIdUra, String clientSecretUra, String x_vertrag, String x_data_ini, String x_data_fim, String urlUra, String timeoutUra) throws JSONException {
		JSONObject retorno = null;
				
		try { 
			
			String clientId = clientIdUra; //"WS_USER_URVV";// clientId
			String clientSecret = clientSecretUra; // "P@ssw0rd";// client secret
			String auth = clientId + ":" + clientSecret;
			String authentication = Base64.getEncoder().encodeToString(auth.getBytes());
			String vertrag = x_vertrag; // N�mero do contrato
			String data_ini = x_data_ini; // Opcional, data in�cio do per�odo para o qual se deseja os consumos. Se n�o preenchido, assume-se X_DATA_FIM menos 730 dias (2 anos)	
			String data_fim = x_data_fim; //Opcional, data fim do per�odo para o qual se deseja os consumos. Se n�o preenchido, assume-se a data corrente
			int timeout = Integer.parseInt(timeoutUra);
			
			String url = urlUra; //"http://ssqplci.light.com.br:50200/XISOAPAdapter/MessageServlet?channel=:BS_URA_VV_QUA:Z_CC_URA_VV_INCLUI_PROT_DECRETO_CRM_SOAP_SENDER&version=3.0&Sender.Service=BS_URA_VV_QUA&Interface=http://www.light.com.br/ura/inclui_prot_decreto_crm^Z_MI_INCLUI_PROT_DECRETO_CRM_OUTBD_SYNC";
			URL obj = new URL(url);
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();
			con.setRequestMethod("POST");
			con.setDoOutput(true);
			con.setConnectTimeout(timeout);
			con.setRequestProperty("Content-Type", "text/xml; charset=utf-8");
			con.setRequestProperty("Authorization", "Basic " + authentication);
			
			String xml = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:his=\"http://www.light.com.br/ura/historico_consumo\">"
							+ "<soapenv:Header/>"  
							+ "<soapenv:Body>"  
							+ "<his:Z_MT_HISTORICO_CONSUMO_REQUEST>"  
							+ "<X_DATA_FIM>"+data_fim+"</X_DATA_FIM>"  
							+ "<X_DATA_INI>"+data_ini+"</X_DATA_INI>"   
							+ "<X_VERTRAG>"+vertrag+"</X_VERTRAG>"  
							+ "</his:Z_MT_HISTORICO_CONSUMO_REQUEST>"   
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
			
		} catch (Exception con) {
			con.getMessage();
			JSONObject json = XML.toJSONObject(con.toString());			
			retorno = json;	
			retorno = retorno.append("Erro:", con.toString());
		}
		return retorno;
	}
}
