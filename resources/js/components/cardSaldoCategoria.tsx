export default function CardSaldoCategoria({ titulo, valor}: { titulo: string, valor: string}) {
    return (
        <div className="w-70 bg-white p-4 rounded-2xl shadow-sm">
            <p className="text-sm text-gray-500">{titulo}</p>
            <p className="text-2xl font-bold">R$ {valor}</p>
        </div>
    )
}