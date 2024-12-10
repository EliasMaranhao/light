export class DebitosCpfCnpj {
    notas?: string;
    instalacao?: string;
    erro?: string;
    num_debitos?: number;
    total_debitos?: number;
    doc_atualizado?: string;
    cob_adic_ren?: string;
    parceiro?: Parceiro = new Parceiro();
    detalhes_cc?: string;
    doc_fiscal?: string;
    detalhes_debitos?: Fatura[] = [];
    endereco?: string;
    capas?: string;
    doc?: string;
}

class Parceiro {
    partner?: string;
    name_org1?: string;
    mobile_number?: string;
    name_org2?: string;
    bpkind?: string;
    name_last?: string;
    filiacao2?: string;
    street?: string;
    filiacao1?: string;
    email?: string;
    tel_number?: string;
    house_num?: string;
    region?: string;
    city1?: string;
    country?: string;
    city2?: string;
    post_code1?: string;
    birthdt?: string;
    type?: string;
    name_first?: string;
}

export class Fatura {
    waers?: string;
    betrw?: string;
    billing_period?: string;
    vtref?: string;
    opbel?: string;
    gpart?: string;
    anlage?: string;
    zimpress?: string;
    faedn?: string;
    vkont?: string;
}