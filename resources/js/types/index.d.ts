enum StatusTransferencia {
    PENDENTE = 'Pendente',
    APROVADA = 'Concluida',
    REJEITADA = 'Cancelada',
}
enum StatusDeposito {
    PENDENTE = 'Pendente',
    APROVADA = 'Concluido',
    REJEITADA = 'Cancelado',
}
export interface Usuario {
    nome: string;
    email: string;
}
export interface Deposito {
    id: number;
    usuario_id: number;
    valor: number;
    descricao: string;
    status: StatusDeposito;
    data_hora_criacao: string;
    data_hora_atualizacao: string;
}
export interface Transferencia {
    id: number;
    usuario_id: number;
    usuario_destino_id: number;
    valor: number;
    descricao: string;
    status: StatusTransferencia;
    data_hora_criacao: string;
    data_hora_atualizacao: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
