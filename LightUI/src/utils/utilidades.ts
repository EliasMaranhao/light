export class Utils {
    public static urlHomologacao = 'https://sspoq.light.com.br/XISOAPAdapter/MessageServlet?senderParty=&senderService=';
    public static urlProducao =    'https://sspop.light.com.br/XISOAPAdapter/MessageServlet?senderParty=&senderService=';

    public static uriIdentificaParceiro =   'URA&receiverParty=&receiverService=&interface=Z_MI_VERIF_PN_INSTAL_OUTBD_SYNC&interfaceNamespace=http://www.light.com.br/ura/verif_pn_instal';
    public static uriObterDadosInstalacao = 'URA&receiverParty=&receiverService=&interface=Z_MI_DADOS_INSTALACAO_OUTBD_SYNC&interfaceNamespace=http://www.light.com.br/ura/dados_instalacao';
    public static uriHistoricoConsumo =     'URA&receiverParty=&receiverService=&interface=Z_MI_HISTORICO_CONSUMO_OUTBD_SYNC&interfaceNamespace=http://www.light.com.br/ura/historico_consumo';
    public static uriDebitosCpfCnpjHml =    'BS_OUTSYSTEMS_QUA&receiverParty=&receiverService=&interface=IdentPNOut_AGV_MI&interfaceNamespace=http://aia/ccs/atca008';
    public static uriDebitosCpfCnpjPrd =    'BS_OUTSYSTEMS_PRD&receiverParty=&receiverService=&interface=IdentPNOut_AGV_MI&interfaceNamespace=http://aia/ccs/atca008';

    public static uriPagamentoProcessamentoProd = 'https://sspop.light.com.br/RESTAdapter/agv/090/PagEmPro';
    public static uriPagamentoProcessamentoHmlg = 'https://sspoq.light.com.br/RESTAdapter/agv/090/PagEmPro';
}