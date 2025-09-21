import Input from "@/components/ui/input";
import { useRef, useState } from "react";
import { depositarApi } from "@/service/contaService";
import Cabecalho from "@/components/cabecalho";

export default function Deposito() {
    const referenciaCampoValor = useRef<HTMLInputElement>(null);
    const referenciaCampoDescricao = useRef<HTMLInputElement>(null);
    const [depositando, setDepositando] = useState(false);

    const depositar = async (event: React.FormEvent) => {
        event.preventDefault();

        setDepositando(true);
        const valor = Number(referenciaCampoValor.current!.value);
        const descricao = referenciaCampoDescricao.current!.value;

        const response = await depositarApi({valor, descricao});
        setDepositando(false);

        if(response.status === 201) {
            window.location.href = '/dashboard';
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto flex flex-col gap-5">
                <Cabecalho />
                <main className="grid grid-cols-1 gap-6">
                    <div className="w-full bg-white p-7 rounded-2xl shadow-sm">
                        <h2 className="text-lg font-medium mb-2">Depósito</h2>
                        <form onSubmit={(event) => depositar(event)} className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">Valor (R$)</label>
                                <Input
                                    type="number"
                                    step="1"
                                    min="1"
                                    placeholder="0.00"
                                    ref={referenciaCampoValor}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Descrição (opcional)</label>
                                <Input
                                    placeholder="Ex: Depósito via boleto"
                                    ref={referenciaCampoDescricao}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 hover:cursor-pointer"
                                disabled={depositando}
                                >
                                {depositando ? 'Aguarde...' : 'Depositar'}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}