import Cabecalho from "@/components/cabecalho";
import CardSaldoCategoria from "@/components/cardSaldoCategoria";
import Resumo from "@/components/resumo";
import { saldoApi, transacoesApi } from "@/service/usuarioService";
import { Deposito } from "@/types";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [receitas, setReceitas] = useState<Deposito[]>([]);
    const [saldo, setSaldo] = useState(0);
    // const [quantidadeTransicoes, setQuantidadeTransacoes] = useState(0);
    const [totalReceitas, setTotalReceitas] = useState(0);
    const [totalDespesas, setTotalDespesas] = useState(0);

    useEffect(() => {
        (async () => {
            const buscarTransacoes = await transacoesApi();
            const buscarSaldo = await saldoApi();
            setReceitas(buscarTransacoes.depositos);
            setSaldo(buscarSaldo);

            const calcularReceitas = buscarTransacoes.depositos.length > 0 ? buscarTransacoes.depositos!.reduce((valor, deposito) => valor + deposito.valor, 0) : 0;
            const calcularDespesas = buscarTransacoes.transferencias.length > 0 ? buscarTransacoes.transferencias!.reduce((valor, transferencia) => valor + transferencia.valor, 0) : 0;
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