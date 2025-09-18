export default function Resumo() {
    return (
        <section className="flex flex-col">
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-6">
                <h2 className="text-lg font-medium mb-2">Resumo</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Saldo</p>
                        <p className="text-xl font-semibold">R$ 0</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Último depósito</p>
                        <p className="text-lg">R$ 0</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Transferências</p>
                        <p className="text-lg">2</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Histórico de transações</h2>
                    <div className="text-sm text-gray-500">5 transações</div>
                </div>

                <div className="space-y-3">
                    {/* {transactions.map((tx) => (
                                        <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg border">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${tx.type === 'deposit' ? 'bg-indigo-500' : 'bg-yellow-500'}`}>
                                                        {tx.type === 'deposit' ? 'D' : 'T'}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{tx.type === 'deposit' ? 'Depósito' : 'Transferência'}</div>
                                                        <div className="text-sm text-gray-500">{tx.note}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className={`font-medium ${tx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>{formatCurrency(tx.amount)}</div>
                                                <div className="text-sm text-gray-500">{tx.date}</div>
                                            </div>
                                        </div>
                                    ))} */}

                    {/* {transactions.length === 0 && <div className="text-center text-gray-500 p-4">Nenhuma transação encontrada.</div>} */}
                </div>
            </div>
        </section>
    );
}