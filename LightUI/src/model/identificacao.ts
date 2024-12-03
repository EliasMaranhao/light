export class Identificacao {
    partner?: string;
    notas?: Nota[] = [];
    message?: string;
    nome?: string;
    tel_ger?: string;
    instalacoes?: Instalacao[] = [];
    partner_guid?: string;
    qinst?: number;
    cpf_cnpj?: string;
    tipoCliente?: string;
    retorno?: number;
}

export class Nota {
    qmdat?: string;
    fecod?: string;
    mngrp?: string;
    ausbs?: string;
    auztb?: string;
    ltrur?: string;
    status?: string;
    qmnum?: string;
    mncod?: string;
    anlage?: string;
    fegrp?: string;
    ltrmn?: string;
    qmart?: string;
}

export class Instalacao {
    cod_bairro?: string;
    celular?: string;
    vertrag?: string;
    cod_rua?: string;
    email?: string;
    cep?: string;
    tp_instal?: string;
    dt_ligacao?: string;
    bairro?: string;
    anlage?: string;
    endereco?: string;
    cod_cidade?: string;
    cidade?: string;
    vkont?: string;
    rua?: string;
}