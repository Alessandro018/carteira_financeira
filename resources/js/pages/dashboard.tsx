import Cabecalho from "@/components/cabecalho";
import CardSaldoCategoria from "@/components/cardSaldoCategoria";
import Resumo from "@/components/resumo";
import { ContextoAplicacao } from "@/context/contextoAutenticacao";
import { saldoApi, transacoesApi } from "@/service/usuarioService";
import { Deposito } from "@/types";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {
    const contextoApp = useContext(ContextoAplicacao);
    const [receitas, setReceitas] = useState<Deposito[]>([]);
    const [saldo, setSaldo] = useState(0);
    const dataAtual = new Date();
    const dataInicio = `${dataAtual.getFullYear()}-${dataAtual.getMonth() + 1}-01`;
    const dataFim = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0).toISOString().slice(0, 10);
    const [totalReceitas, setTotalReceitas] = useState(0);
    const [totalDespesas, setTotalDespesas] = useState(0);

    useEffect(() => {
        (async () => {
            const buscarTransacoes = await transacoesApi({dataInicio: dataInicio, dataFim: dataFim});
            const buscarSaldo = await saldoApi();
            setReceitas(buscarTransacoes.depositos);
            setSaldo(buscarSaldo);

            console.log(contextoApp?.usuario?.id);
            let calcularReceitas = buscarTransacoes.depositos!.reduce((valor, deposito) => valor + (deposito.status == 'Concluido' ? deposito.valor : 0), 0);
            const calcularDespesas = buscarTransacoes.transferencias!.reduce((valor, transferencia) => {
                if(transferencia.status == 'Concluida') {
                    if(transferencia.usuario_destino_id== contextoApp?.usuario?.id) {
                        calcularReceitas += transferencia.valor;
                        return 0;
                    }
                    return valor + transferencia.valor;
                }
                return 0
            }, 0);
            setTotalReceitas(calcularReceitas);
            setTotalDespesas(calcularDespesas);
        })();
    }, []);
    const valorUltimaTransacao = receitas?.[0]?.valor ?? 0;
    
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto flex flex-col gap-5">
                <Cabecalho />
                <main className="grid grid-cols-1 gap-6"> {/*lg:grid-cols-3*/}
                    <section className="flex gap-2 justify-between">
                        <CardSaldoCategoria titulo="Receitas" valor={totalReceitas} />
                        <CardSaldoCategoria titulo="Despesas" valor={totalDespesas} />
                    </section>
                    <Resumo saldo={saldo} valorUltimoDeposito={valorUltimaTransacao} quantidadeTransferencias={receitas.length}/>
                </main>
            </div>
        </div>
    );
}