import BotaoAcao from "@/components/botaoAcao";
import CardSaldoCategoria from "@/components/cardSaldoCategoria";
import Resumo from "@/components/resumo";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Carteira</h1>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Saldo disponível</p>
                        <p className="text-2xl font-bold">R$ 0</p>
                    </div>
                </header>

                <main className="grid grid-cols-1 gap-6"> {/*lg:grid-cols-3*/}
                    <section className="flex gap-2">
                        <BotaoAcao irPara="/deposito">
                            <span>Depositar</span>
                        </BotaoAcao>
                        <BotaoAcao irPara="/transferencia">
                            <span>Transferir</span>
                        </BotaoAcao>
                        <BotaoAcao irPara="/">
                            <span>Movimentações</span>
                        </BotaoAcao>
                    </section>
                    <section className="flex gap-2 justify-between">
                        <CardSaldoCategoria titulo="Receitas" valor="0" />
                        <CardSaldoCategoria titulo="Despesas" valor="0" />
                    </section>
                    <Resumo />
                </main>
            </div>
        </div>
    );
}