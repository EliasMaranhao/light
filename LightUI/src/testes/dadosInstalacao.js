var dados = {
    "SOAP:Envelope": {
        "SOAP:Body": {
            "ns1:Z_MT_DADOS_INSTALACAO_RESPONSE": {
                "Y_DT_PROX_LEIT": "2024-11-30",
                "Y_LIMINAR": "",
                "Y_TIPO_LIG": 3,
                "Y_FRAUDE": "",
                "Y_VALFAT": 18767.73,
                "Y_RETURN": 0,
                "Y_TELEMED": "X",
                "Y_MESSAGE": "",
                "Y_DEB_AUT": "",
                "YE_SUSPENSAO": {
                    "DISCNO": "000031686041",
                    "STATUS": 20,
                    "MOT_CORTE": "ZFGC"
                },
                "Y_QTFAT": 1,
                "xmlns:ns1": "http://www.light.com.br/ura/dados_instalacao",
                "YT_FATURAS": {
                    "item": {
                        "BILLING_PERIOD": "2023/08",
                        "BETRW": 18767.73,
                        "DTVENC": "2023-09-28",
                        "TAG_RETIDA": "",
                        "PRINTDOC": "",
                        "INVOICE": 523310326119,
                        "CODBARRAS": 836300001879677300531071966020618114200000376489
                    }
                },
                "YT_CONSUMOS": ""
            }
        },
        "xmlns:SOAP": "http://schemas.xmlsoap.org/soap/envelope/",
        "SOAP:Header": ""
    }
};

var res = dados['SOAP:Envelope']['SOAP:Body']['ns1:Z_MT_DADOS_INSTALACAO_RESPONSE'];
var faturas = res.YT_FATURAS;

console.log(JSON.stringify(faturas.item.BETRW));