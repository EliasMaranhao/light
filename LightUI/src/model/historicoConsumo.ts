export class HistoricoConsumo {
    consumos: Consumo[] = [];
    message?: string;
    retorno?: number;
}

export class Consumo{
    vertrag?: string;
    mes_ref?: string;
    consumo?: number;
    dias?: number;
    media_dia?: number;
    flag_media?: number;
    nota_leitur?: number;
    flag_bloq?: string;
    flag_fat_nok?: string;
    ctg_tarifa?: string;
    val_fatura?: number;
    val_consumo?: number;
    aliq_icms?: number;
    doc_calc?: number;
    doc_impr?: number;
    bandeira?: string;
    valtar?: number;
    classe?: number;
    media_consumo?: number;
    tipo_fat?: string;
}