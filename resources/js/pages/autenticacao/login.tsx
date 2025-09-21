import Input from "@/components/ui/input";
import { autenticarApi } from "@/service/usuarioService";
import { useRef, useState } from "react";

export default function Login() {
    const referenciaCampoEmail = useRef<HTMLInputElement>(null);
    const referenciaCampoSenha = useRef<HTMLInputElement>(null);
    const [autenticando, setAutenticando] = useState(false);
    const [erros, setErros] = useState<{ [key: string]: string[] }>({});

    const autenticar = async (event: React.FormEvent) => {
        event.preventDefault();

        setAutenticando(true);
        const email = referenciaCampoEmail.current!.value;
        const senha = referenciaCampoSenha.current!.value;
        const response = await autenticarApi({email: email, senha: senha}).catch((error) => {
            if(error.response.status === 422) {
                setErros(error.response.data.errors);
            }
        });
        setAutenticando(false);
        
        if(response?.status === 200) {
            if(response.data.mensagem) {
                alert(response.data.mensagem);
            } else {
                setErros(response.data.erros);
            }
        }
        if(response?.data?.email) {
            sessionStorage.setItem('usuario_carteira', JSON.stringify(response.data));
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
                                <Input type="email" ref={referenciaCampoEmail} erro={erros.email?.[0]} required/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Senha</label>
                                <Input type="password" ref={referenciaCampoSenha} erro={erros.senha?.[0]} minLength={5} required/>
                            </div>
                            <a href="/conta/cadastrar" className="text-sm text-gray-500 hover:underline">Ainda não tenho uma conta</a>
                            <div className="flex gap-2 pt-3">
                                <button 
                                    type="submit"
                                    className="flex-1 inline-flex justify-center hover:cursor-pointer items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                                    disabled={autenticando}
                                    >
                                    {autenticando ? 'Aguarde...' : 'Enviar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}