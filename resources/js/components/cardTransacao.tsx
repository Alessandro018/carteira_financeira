import { cancelarTransferenciaApi } from "@/service/contaService";
import { formatarMoeda } from "@/service/globalService";
import { Transacao } from "@/types";
import { useState } from "react";

export default function CardTransacao({ transacao }: { transacao: Transacao }) {
    const [ cancelado, setCancelado ] = useState(transacao.status === 'Cancelado' || transacao.status === 'Cancelada');
    const cancelarTransferencia = async (id: number) => {
        const confirmacao = confirm('Tem certeza que deseja cancelar essa transferência?');
        if(!confirmacao) return;
        
        const response = await cancelarTransferenciaApi(id);
        switch(response.status) {
            case 200:
                alert(response.data.mensagem);
                break;
            case 204:
                setCancelado(true);
                alert('Transferência cancelada com sucesso!');
                break;
        } 
    }
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
            <div className="flex justify-between gap-6">
                <div className="text-right">
                    <div className={`font-medium ${transacao.tipo === 'Depósito' ? 'text-green-600' : 'text-red-600'}`}>
                        {formatarMoeda(transacao.valor)}
                    </div>
                    <div className="text-sm text-gray-500">{transacao.data_hora_criacao}</div>
                </div>
                {!cancelado && <button type="button" onClick={() => cancelarTransferencia(transacao.id)} className="text-sm text-gray-500 :hover:underline :hover:text-gray-600 :hover:cursor-pointer">Cancelar</button>}
            </div>
        </div>
    )
}