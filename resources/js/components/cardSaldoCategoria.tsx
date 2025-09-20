import { formatarMoeda } from "@/service/globalService";

export default function CardSaldoCategoria({ titulo, valor}: { titulo: string, valor: number}) {
    return (
        <div className="w-70 bg-white p-4 rounded-2xl">
            <p className="text-sm text-gray-500">{titulo}</p>
            <p className="text-2xl font-bold">{formatarMoeda(valor)}</p>
        </div>
    )
}