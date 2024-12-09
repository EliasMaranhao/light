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

public class PagamentoEmProcessamento {
    public static JSONObject executePagamentoEmAndamento (String clientId, String clientSecret, String parceiro, String tipo, String conta_contrato, String contrato, String instalacao, String timeoutUra, String urlUra) throws JSONException {
		JSONObject retorno = null;
		JSONObject request = new JSONObject();
		
		try { 
			
			String auth = clientId + ":" + clientSecret;
			String authentication = Base64.getEncoder().encodeToString(auth.getBytes());
			
			int timeout = Integer.parseInt(timeoutUra);
			
			URL obj = new URL(urlUra);
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();
			con.setRequestMethod("POST");
			con.setDoOutput(true);
			con.setConnectTimeout(timeout);
			con.setRequestProperty("Content-Type", "application/json; charset=utf-8");
			con.setRequestProperty("Authorization", "Basic " + authentication);
			
			request.put("I_PARCEIRO", parceiro);
			request.put("I_TIPO", tipo);
			request.put("I_CONTA_CONTRATO", conta_contrato);
			request.put("I_CONTRATO", contrato);
			request.put("I_INSTALACAO", instalacao);
		
			DataOutputStream wr = new DataOutputStream(con.getOutputStream());
			
			wr.writeBytes(request.toString());
			wr.flush();
			wr.close();
			String responseStatus = con.getResponseMessage();
			
			int responseError = con.getResponseCode();			
			
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
			retorno = new JSONObject(response.toString());
			
		} catch (IOException er) {
			retorno = new JSONObject().append("erro:", er.toString());		
			
		} catch (Exception con) {
			retorno = new JSONObject().append("erro:", con.toString());
		}
		return retorno;
	}
}
