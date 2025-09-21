import Cabecalho from "@/components/cabecalho";
import CardTransacao from "@/components/cardTransacao";
import { transacoesApi } from "@/service/usuarioService";
import { Transacao } from "@/types";
import { useEffect, useState } from "react";

export default function PaginaTransacao() {
    const [transacoes, setTransacoes] = useState<(Transacao)[]>([]);

    useEffect(() => {
        (async () => {
            const buscarTransacoes = await transacoesApi();
            const movimentacoes = [...buscarTransacoes.transferencias,...buscarTransacoes.depositos];
            const movimentacoesOrdenadas = movimentacoes.sort((a, b) => new Date(b.data_hora_criacao).getTime() - new Date(a.data_hora_criacao).getTime());
            const tiparTransacoes = movimentacoesOrdenadas.map((movimentacao) => {
                const tipoMovimentacao = Object.prototype.hasOwnProperty.call(movimentacao, 'usuario_destino_id') ? 'Transferência' : 'Depósito';
                const transacao = { ...movimentacao, tipo: tipoMovimentacao };
                return transacao;
            })

            setTransacoes(tiparTransacoes);
        })();
    }, []);
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto flex flex-col gap-5">
                <Cabecalho />
                <main className="grid grid-cols-1 gap-6">
                    <div className="bg-white p-4 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium">Histórico de transações</h2>
                            <div className="text-sm text-gray-500">{transacoes.length} transações</div>
                        </div>
                        <div className="space-y-3">
                            {transacoes.map((transacao) => (
                                <CardTransacao key={transacao.id} transacao={transacao} />
                            ))}

                            {transacoes.length === 0 && <div className="text-center text-gray-500 p-4">Nenhuma transação encontrada.</div>}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}