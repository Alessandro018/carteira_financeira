import axios from "axios";

export interface DepositoPayload {
    valor: number,
    descricao: string
}

export const depositarApi = async (payload: DepositoPayload) => {
    const tokenCsrf = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const response = await axios({
        url: '/api/v1/conta/depositar',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': tokenCsrf
        },
        data: JSON.stringify({
            valor: payload.valor,
            descricao: payload.descricao
        }),
    });
    return response;
}