import axios from "axios";

export interface DepositoPayload {
    valor: number,
    descricao: string
}
export interface TransferenciaPayload {
    email: string,
    valor: number,
    descricao: string
}
const baseUrl = '/api/v1/conta';
export const depositarApi = async (payload: DepositoPayload) => {
    const tokenCsrf = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const response = await axios({
        url: `${baseUrl}/deposito`,
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
export const transferirApi = async (payload: TransferenciaPayload) => {
    const tokenCsrf = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const response = await axios({
        url: `${baseUrl}/transferencia`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': tokenCsrf
        },
        data: JSON.stringify(payload),
    });
    return response;
}