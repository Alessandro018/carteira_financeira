import Input from "@/components/ui/input";


export default function PaginaTransferencia() {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="w-sm mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Transferência</h1>
                </header>
                <main className="flex flex-center">
                    <div className="w-full bg-white p-4 rounded-2xl shadow-sm">
                        <h2 className="text-lg font-medium mb-2">Transferir saldo</h2>
                        <form onSubmit={() => { }} className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium mb-1">Para</label>
                                <Input value={''} onChange={() => { }} placeholder="Nome ou e-mail do destinatário"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Valor (R$)</label>
                                <Input value={''} onChange={() => { }} placeholder="0,00"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Descrição (opcional)</label>
                                <Input value={''} onChange={() => { }}/>
                            </div>
                            <div className="flex gap-2">
                                <button type="submit" className="flex-1 inline-flex justify-center hover:cursor-pointer items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
