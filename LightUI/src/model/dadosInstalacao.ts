export class DadosInstalacao {
    suspensao?: Suspensao;
    consumos?: Consumo[] = [];
    faturas:  Fatura[] = [];
    debitoAutomatico?: string;
    dataProximaLeitura?: string;
    fraude?: string;
    liminar?: string;
    message?: string = '';
    quantidadeFaturas?: number;
    retorno?: number;
    telemed?: string;
    tipoLigacao?: string;
    valorFatura?: number;
}

export class Suspensao {
    discno?: string;
    motivoCorte?: string;
    status?: string;
}

export class Consumo {

}

export class Fatura {
    invoice?: string;
    periodoFatura?: string;
    dataVencimento?: string;
    betrw?: number;
    printdoc?: string;
    codigoBarras?: string;
    tagRetida?: string;
}