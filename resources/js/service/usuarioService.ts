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

export const cadastrarUsuarioApi = async (payload: UsuarioPayload) => {
    const tokenCsrf = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const response = await axios({
        url: '/api/v1/conta/cadastrar',
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
        url: '/api/v1/conta/autenticar',
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