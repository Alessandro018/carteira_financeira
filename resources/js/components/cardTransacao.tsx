import { formatarMoeda } from "@/service/globalService";
import { Transacao } from "@/types";

export default function CardTransacao({ transacao }: { transacao: Transacao }) {
    return (
        <div key={transacao.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 rounded-xl">
            <div>
                <div className="flex items-center gap-3">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${transacao.tipo === 'Depósito' ? 'bg-indigo-500' : 'bg-yellow-500'}`}>
                        {transacao.tipo === 'Depósito' ? 'D' : 'T'}
                    </div>
                    <div>
                        <div className="font-medium">{transacao.tipo}</div>
                        <div className="text-sm text-gray-500">{transacao.descricao}</div>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <div className={`font-medium ${transacao.tipo === 'Depósito' ? 'text-green-600' : 'text-red-600'}`}>
                    {formatarMoeda(transacao.valor)}
                </div>
                <div className="text-sm text-gray-500">{transacao.data_hora_criacao}</div>
            </div>
        </div>
    )
}