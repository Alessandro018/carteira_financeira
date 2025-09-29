import { cancelarDepositoApi, cancelarTransferenciaApi } from "@/service/contaService";
import { formatarHora, formatarMoeda } from "@/utils/global";
import { Transacao } from "@/types";
import { useContext, useEffect, useState } from "react";
import { ContextoAplicacao } from "@/context/contextoAutenticacao";

export default function CardTransacao({ transacao }: { transacao: Transacao }) {
    const contextoApp = useContext(ContextoAplicacao);
    const [ cancelado, setCancelado ] = useState(transacao.status === 'Cancelado' || transacao.status === 'Cancelada');
    const [corTextoValor, setCorTextoValor] = useState('text-gray-500');

    async function cancelarTransferencia(id: number) {
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
    async function cancelarDeposito(id: number) {
        const confirmacao = confirm('Tem certeza que deseja cancelar esse depósito?');
        if(!confirmacao) return;
        
        const response = await cancelarDepositoApi(id);
        switch(response.status) {
            case 200:
                alert(response.data.mensagem);
                break;
            case 204:
                setCancelado(true);
                alert('Deposito cancelado com sucesso!');
                break;
        } 
    }

    function alterarCor() {
        if(cancelado) {
            setCorTextoValor('text-gray-500');
            return;
        }
        if(transacao.tipo === 'Depósito' || transacao?.usuario_destino_id == contextoApp?.usuario?.id) {
            setCorTextoValor('text-green-600');
        } else {
            setCorTextoValor('text-red-600');
        }
    }

    useEffect(() => {
        alterarCor();
    }, [cancelado]);

    async function cancelarTransacao(transacao: Transacao) {
        if(transacao.tipo === 'Depósito') {
            cancelarDeposito(transacao.id)
        } else {
            cancelarTransferencia(transacao.id);
        }
    }
    return (
        <div 
            key={transacao.id}
            className={`flex items-center justify-between p-3 rounded-lg border border-gray-200 rounded-xl ${cancelado && 'bg-gray-100'}`}
        >
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
                    <div className={`font-medium ${corTextoValor} ${cancelado && 'line-through'}`}>
                        {formatarMoeda(transacao.valor)}
                    </div>
                    <div className="text-sm text-gray-500">{formatarHora(transacao.data_hora_criacao)}</div>
                </div>
                {!cancelado && <button type="button" onClick={() => cancelarTransacao(transacao)} className="text-sm text-gray-500 :hover:underline :hover:text-gray-600 :hover:cursor-pointer">Cancelar</button>}
            </div>
        </div>
    )
}