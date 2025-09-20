import Input from "@/components/ui/input";
import { cadastrarUsuarioApi } from "@/service/usuarioService";
import React, { useRef, useState } from "react";

export default function PaginaTransferencia() {
    const referenciaCampoNome = useRef<HTMLInputElement>(null);
    const referenciaCampoEmail = useRef<HTMLInputElement>(null);
    const referenciaCampoSenha = useRef<HTMLInputElement>(null);
    const referenciaCampoConfirmar = useRef<HTMLInputElement>(null);
    const [cadastrando, setCadastrando] = useState(false);

    const cadastrar = async (event: React.FormEvent) => {
        event.preventDefault();

        const nome = referenciaCampoNome.current!.value;
        const email = referenciaCampoEmail.current!.value;
        const senha = referenciaCampoSenha.current!.value;
        const confirmarSenha = referenciaCampoConfirmar.current!.value;

        setCadastrando(true);
        const response = await cadastrarUsuarioApi({nome, email, senha, confirmarSenha}).catch((error) => {
            if(error.response.status === 422) {
                alert(error.response.data.errors[0].msg);
            }
        });
        setCadastrando(false);

        if(response?.status === 201) {
            window.location.href = '/login';
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="w-sm mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Carteira Financeira</h1>
                </header>
                <main className="flex flex-center">
                    <div className="w-full bg-white p-7 rounded-2xl shadow-sm">
                        <h2 className="text-lg font-medium mb-2">Criar Conta</h2>
                        <form onSubmit={(event) => cadastrar(event)} className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nome</label>
                                <Input type="text" ref={referenciaCampoNome} required/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">E-mail</label>
                                <Input type="email" ref={referenciaCampoEmail} required/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Senha</label>
                                <Input type="password" ref={referenciaCampoSenha} required/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Confirmar Senha</label>
                                <Input type="password" ref={referenciaCampoConfirmar} required/>
                            </div>
                            <a href="/" className="text-sm text-gray-500 hover:underline">Já tenho uma conta</a>
                            <div className="flex gap-2 pt-3">
                                <button
                                    type="submit"
                                    className="flex-1 inline-flex justify-center hover:cursor-pointer items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                                    disabled={cadastrando}>
                                    {cadastrando ? 'Aguarde...' : 'Cadastrar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
