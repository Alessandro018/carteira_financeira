import { Deposito, Transferencia } from "@/types";
import axios from "axios";

export interface UsuarioPayload {
    nome: string,
    email: string,
    senha: string,
    confirmarSenha: string
}
export interface AutenticarPayload {
    email: string,
    senha: string
}
const baseUrl = '/api/v1/conta';

export const cadastrarUsuarioApi = async (payload: UsuarioPayload) => {
    const tokenCsrf = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const response = await axios({
        url: `${baseUrl}/cadastrar`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': tokenCsrf
        },
        data: JSON.stringify(payload),
    })
    return response;
}

export const autenticarApi = async (payload: AutenticarPayload) => {
    const tokenCsrf = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const response = await axios({
        url: `${baseUrl}/autenticar`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': tokenCsrf
        },
        data: JSON.stringify(payload),
    })
    return response;
}
export const transacoesApi = async ({dataInicio, dataFim}: {dataInicio: string, dataFim?: string}) => {
    const tokenCsrf = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const response = await axios({
        url: `${baseUrl}/transacoes?dataInicio=${dataInicio}` + (dataFim ? `&dataFim=${dataFim}` : ''),
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': tokenCsrf
        }
    })

    if(response.status === 200) {
        const {depositos, transferencias}: {depositos: Deposito[], transferencias: Transferencia[]} = response.data;
        return {depositos, transferencias};
    }
    return {
        depositos: [],
        transferencias: []
    };
}
export const saldoApi = async () => {
    const tokenCsrf = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const response = await axios({
        url: `${baseUrl}/saldo`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': tokenCsrf
        }
    })

    if(response.status === 200) {
        return response.data as number;
    }
    return 0;
}

// export const calcular