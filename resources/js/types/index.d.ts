export interface Usuario {
    id: number;
    nome: string;
    email: string;
    saldo: number;
    data_criacao: string;
    data_atualizacao: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
