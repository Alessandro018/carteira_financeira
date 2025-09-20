import Input from "@/components/ui/input";
import axios from "axios";
import { useRef } from "react";


export default function Login() {
    const tokenCsrf = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const referenciaCampoEmail = useRef<HTMLInputElement>(null);
    const referenciaCampoSenha = useRef<HTMLInputElement>(null);

    const autenticar = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await axios({
            url: '/api/v1/conta/autenticar',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': tokenCsrf
            },
            data: JSON.stringify({
                email: referenciaCampoEmail.current?.value,
                senha: referenciaCampoSenha.current?.value
            }),
        })
        
        if(response.status === 200) {
            sessionStorage.setItem('usuario', JSON.stringify(response.data));
            window.location.href = '/dashboard';
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
                        <h2 className="text-lg font-medium mb-2">Acessar conta</h2>
                        <form onSubmit={(event) => autenticar(event)} className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">E-mail</label>
                                <Input type="email" ref={referenciaCampoEmail}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Senha</label>
                                <Input type="password" ref={referenciaCampoSenha}/>
                            </div>
                            <a href="/conta/cadastrar" className="text-sm text-gray-500 hover:underline">Ainda não tenho uma conta</a>
                            <div className="flex gap-2 pt-3">
                                <button type="submit" className="flex-1 inline-flex justify-center hover:cursor-pointer items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
