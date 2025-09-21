import { formatarMoeda } from "@/service/globalService";

interface ResumoProps {
    saldo: number,
    valorUltimoDeposito: number,
    quantidadeTransferencias: number
}
export default function Resumo({ saldo, valorUltimoDeposito, quantidadeTransferencias }: ResumoProps) {
    return (
        <section className="flex flex-col">
            <div className="bg-white p-4 rounded-2xl mb-6">
                <h2 className="text-lg font-medium mb-2">Resumo</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-500">Saldo</p>
                        <p className="text-xl font-semibold">{formatarMoeda(saldo)}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-500">Último depósito</p>
                        <p className="text-lg">{formatarMoeda(valorUltimoDeposito)}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-500">Transferências</p>
                        <p className="text-lg">{quantidadeTransferencias}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}