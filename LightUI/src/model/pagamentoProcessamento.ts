export class PagamentoProcessamento {
    faturas: Fatura[] = [];
}

export class Fatura {
    parceiro?: string;
    contaContrato?: string;
    contrato?: string;
    instalacao?: string;
    zimpress?: string;
    billing_period?: string;
    betrw?: string;
    faedn?: string;
    tipo_pag?: string;
    agente_arrecadador?: string;
    data_pagamento?: string;
    hora_pagamento?: string;
}