let response = {
    "SOAP:Envelope": {
        "SOAP:Body": {
            "ns1:Z_MT_VERIF_PN_INSTAL_RESPONSE": {
                "Y_PARTNER": "0030416563",
                "YT_NOTAS": "",
                "Y_MESSAGE": "",
                "Y_NOME": "ELIAS MARANHAO ANTONIO",
                "xmlns:ns1": "http://www.light.com.br/ura/verif_pn_instal",
                "Y_TEL_GER": "",
                "YT_INSTALS": {
                    "item": {
                        "COD_BAIRRO": "00000655",
                        "CELULAR": 21975280016,
                        "VERTRAG": 7000810853,
                        "COD_RUA": "000000032352",
                        "EMAIL": "elias.antonio@accenture.com",
                        "CEP": "20745-180",
                        "TP_INSTAL": 1,
                        "DT_LIGACAO": "2019-02-12",
                        "BAIRRO": "AGUA SANTA",
                        "ANLAGE": "0410556580",
                        "ENDERECO": "R VIOLETA 452 CA 11",
                        "COD_CIDADE": "000000000027",
                        "CIDADE": "RIO DE JANEIRO",
                        "VKONT": "010113329285",
                        "RUA": "R VIOLETA"
                    }
                },
                "Y_PARTNER_GUID": "48308A2A0C7B709DE10000000A034C27",
                "Y_QTINST": "0001",
                "Y_CPF_CNPJ": "07375555729",
                "Y_TP_CLIENTE": "Z001",
                "Y_RETURN": 0
            }
        },
        "xmlns:SOAP": "http://schemas.xmlsoap.org/soap/envelope/",
        "SOAP:Header": ""
    }
};



let res = response['SOAP:Envelope']['SOAP:Body']['ns1:Z_MT_VERIF_PN_INSTAL_RESPONSE'];
let instalacao = res.YT_INSTALS.item;

console.log(JSON.stringify(instalacao));