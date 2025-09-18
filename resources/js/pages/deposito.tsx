export default function Deposito() {
    return (
        <section className="lg:col-span-1 space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm">
                <h2 className="text-lg font-medium mb-2">Depósito</h2>
                <form onSubmit={() => { }} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium mb-1">Valor (R$)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={''}
                            onChange={() => { }}
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Descrição (opcional)</label>
                        <input
                            value={''}
                            onChange={() => { }}
                            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Ex: Depósito via boleto"
                        />
                    </div>
                    <button className="w-full inline-flex justify-center items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700">
                        Depositar
                    </button>
                </form>
            </div>
        </section>
    )
}