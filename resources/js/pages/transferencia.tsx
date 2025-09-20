import Input from "@/components/ui/input";
import { transferirApi } from "@/service/contaService";
import { useRef, useState } from "react";

export default function PaginaTransferencia() {
    const referenciaCampoEmail = useRef<HTMLInputElement>(null);
    const referenciaCampoValor = useRef<HTMLInputElement>(null);
    const referenciaCampoDescricao = useRef<HTMLInputElement>(null);
    const [transferindo, setTransferindo] = useState(false);

    const transferir = async (event: React.FormEvent) => {
        event.preventDefault();

        setTransferindo(true);
        const email = referenciaCampoEmail.current!.value;
        const valor = Number(referenciaCampoValor.current!.value);
        const descricao = referenciaCampoDescricao.current!.value;

        const response = await transferirApi({email, valor, descricao});
        setTransferindo(false);

        if(response.status === 201) {
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
                        <h2 className="text-lg font-medium mb-2">Transferir saldo</h2>
                        <form onSubmit={(event) => transferir(event)} className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">Para</label>
                                <Input ref={referenciaCampoEmail} placeholder="Nome ou e-mail do destinatário"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Valor (R$)</label>
                                <Input ref={referenciaCampoValor} placeholder="0,00"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Descrição (opcional)</label>
                                <Input ref={referenciaCampoDescricao}/>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 inline-flex justify-center hover:cursor-pointer items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 hover:cursor-pointer"
                                    disabled={transferindo}
                                    >
                                    {transferindo ? 'Aguarde...' : 'Enviar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
