import { Usuario } from "@/types";
import BotaoAcao from "./botaoAcao";
import { formatarMoeda } from "@/service/globalService";
import { useEffect, useState } from "react";
import { saldoApi } from "@/service/usuarioService";

export default function Cabecalho() {
    const usuario = JSON.parse(`${sessionStorage!.getItem('usuario_carteira')}`) as Usuario;
    const [saldo, setSaldo] = useState(0);
    const rota = location.pathname;

    useEffect(() => {
        (async () => {
            const buscarSaldo = await saldoApi();
            setSaldo(buscarSaldo);
        })();
    }, []);

    return (
        <>
            <header className="flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold">Carteira</h1>
                    <p className="text-md text-gray-500">Olá, {usuario.nome}!</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Saldo disponível</p>
                    <p className="text-2xl font-bold">{formatarMoeda(saldo)}</p>
                </div>
            </header>
            <div className="grid grid-cols-1 gap-6"> {/*lg:grid-cols-3*/}
                <section className="flex gap-2">
                    <BotaoAcao navegarPara="/dashboard" className={rota === "/dashboard" ? "btn-navegacao-ativo" : ""}>
                        <span>Inicial</span>
                    </BotaoAcao>
                    <BotaoAcao navegarPara="/depositar" className={rota === "/deposito" ? "btn-navegacao-ativo" : ""}>
                        <span>Depositar</span>
                    </BotaoAcao>
                    <BotaoAcao navegarPara="/transferir" className={rota === "/transferencia" ? "btn-navegacao-ativo" : ""}>
                        <span>Transferir</span>
                    </BotaoAcao>
                    <BotaoAcao navegarPara="/transacoes" className={rota === "/transacoes" ? "btn-navegacao-ativo" : ""}>
                        <span>Transações</span>
                    </BotaoAcao>
                </section>
            </div>
        </>
    )
}