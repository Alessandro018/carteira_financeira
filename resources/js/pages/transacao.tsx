import Cabecalho from "@/components/cabecalho";
import CardTransacao from "@/components/cardTransacao";
import Input from "@/components/ui/input";
import { transacoesApi } from "@/service/usuarioService";
import { Transacao } from "@/types";
import { useEffect, useRef, useState } from "react";

export default function PaginaTransacao() {
    const [transacoes, setTransacoes] = useState<(Transacao)[]>([]);
    const [dataFiltrada, setDataFiltrada] = useState('');
    const referenciaCampoData = useRef<HTMLInputElement>(null);

    async function buscarTransacoes(data: string) {
        const buscarMovimentacoes = await transacoesApi({dataInicio: data});
        return [...buscarMovimentacoes.transferencias, ...buscarMovimentacoes.depositos];
    }

    async function filtrarTransacoes(data: string) {
        if(!dataFiltrada || dataFiltrada === '') return;
        const movimentacoes = await buscarTransacoes(data);
        const movimentacoesOrdenadas = movimentacoes.sort((a, b) => new Date(b.data_hora_criacao).getTime() - new Date(a.data_hora_criacao).getTime());
        const tiparTransacoes = movimentacoesOrdenadas.map((movimentacao) => {
            const tipoMovimentacao = Object.prototype.hasOwnProperty.call(movimentacao, 'usuario_destino_id') ? 'Transferência' : 'Depósito';
            const transacao = { ...movimentacao, tipo: tipoMovimentacao };
            return transacao;
        })

        setTransacoes(tiparTransacoes);
    }

    function alterarData() {
        if(referenciaCampoData.current) {
            setDataFiltrada(referenciaCampoData.current.value);
        }
    }
    function iniciarData() {
        const data = new Date();
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear();
        const dataFormatada = `${ano}-${mes}-${dia}`;
        setDataFiltrada(dataFormatada);
    }

    useEffect(() => {
        iniciarData();
    }, []);

    useEffect(() => {
        if(dataFiltrada) {
            filtrarTransacoes(dataFiltrada);
        }
    }, [dataFiltrada]);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto flex flex-col gap-5">
                <Cabecalho />
                <main className="grid grid-cols-1 gap-6">
                    <div className="bg-white p-4 rounded-2xl flex flex-col gap-2">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium">Histórico de transações</h2>
                                <div className="flex items-center gap-2">
                                    <Input type="date" ref={referenciaCampoData} onChange={alterarData} value={dataFiltrada}/>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500 text-right">{transacoes.length} transações</div>
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