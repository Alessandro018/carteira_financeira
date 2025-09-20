import BotaoAcao from "@/components/botaoAcao";
import CardSaldoCategoria from "@/components/cardSaldoCategoria";
import Resumo from "@/components/resumo";
import { formatarMoeda } from "@/service/globalService";
import { saldoApi, transacoesApi } from "@/service/usuarioService";
import { Deposito, Transferencia, Usuario } from "@/types";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const usuario = JSON.parse(`${sessionStorage!.getItem('usuario_carteira')}`) as Usuario;
    const [saldo, setSaldo] = useState(0);
    const [receitas, setReceitas] = useState<Deposito[]>([]);
    const [despesas, setDespesas] = useState<Transferencia[]>([]);
    // const [quantidadeTransicoes, setQuantidadeTransacoes] = useState(0);
    const [totalReceitas, setTotalReceitas] = useState(0);
    const [totalDespesas, setTotalDespesas] = useState(0);

    useEffect(() => {
        (async () => {
            const buscarTransacoes = await transacoesApi();
            const buscarSaldo = await saldoApi();
            setReceitas(buscarTransacoes.depositos);
            setDespesas(buscarTransacoes.transferencias);
            setSaldo(buscarSaldo);

            const calcularReceitas = buscarTransacoes.depositos.length > 0 ? buscarTransacoes.depositos!.reduce((valor, deposito) => valor + deposito.valor, 0) : 0;
            const calcularDespesas = buscarTransacoes.transferencias.length > 0 ? buscarTransacoes.transferencias!.reduce((valor, transferencia) => valor + transferencia.valor, 0) : 0;
            setTotalReceitas(calcularReceitas);
            setTotalDespesas(calcularDespesas);
            // setQuantidadeTransacoes(buscarTransacoes.depositos.length + buscarTransacoes.transferencias.length);
        })();
        console.log(receitas);
        console.log(despesas);
    }, []);
    // const receitas = transacoes.filter(transacao => transacao.valor > 0).reduce((acc, transacao) => acc + transacao.valor, 0);
    // const despesas = transacoes.filter(transacao => transacao.valor < 0).reduce((acc, transacao) => acc + transacao.valor, 0);
    const valorUltimaTransacao = receitas?.[0]?.valor ?? 0;
    
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold">Carteira</h1>
                        <p className="text-md text-gray-500">Olá, {usuario.nome}!</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Saldo disponível</p>
                        <p className="text-2xl font-bold">{formatarMoeda(saldo)}</p>
                    </div>
                </header>

                <main className="grid grid-cols-1 gap-6"> {/*lg:grid-cols-3*/}
                    <section className="flex gap-2">
                        <BotaoAcao navegarPara="/deposito">
                            <span>Depositar</span>
                        </BotaoAcao>
                        <BotaoAcao navegarPara="/transferencia">
                            <span>Transferir</span>
                        </BotaoAcao>
                        <BotaoAcao navegarPara="/">
                            <span>Movimentações</span>
                        </BotaoAcao>
                    </section>
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