import BotaoAcao from "@/components/botaoAcao";
import CardSaldoCategoria from "@/components/cardSaldoCategoria";
import Resumo from "@/components/resumo";
import { Usuario } from "@/types";

export default function Dashboard() {
    const usuario = JSON.parse(`${sessionStorage!.getItem('usuario')}`) as Usuario;
    
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
                        <p className="text-2xl font-bold">R$ {usuario.saldo}</p>
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
                        <CardSaldoCategoria titulo="Receitas" valor="0" />
                        <CardSaldoCategoria titulo="Despesas" valor="0" />
                    </section>
                    <Resumo />
                </main>
            </div>
        </div>
    );
}