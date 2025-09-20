<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Transferencia;
use App\Models\Usuario;
use Illuminate\Http\Request;

class TransferenciaController extends Controller
{
    public function realizarTransferencia(Request $request)
    {
        $dadosTransferencia = $request->validate([
            'email' => 'required|email',
            'valor' => 'required|numeric',
            'descricao' => 'max:80',
        ]);

        if($dadosTransferencia['email'] == $request->user()->email) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Você não pode transferir para você mesmo'
            ]);
        }

        if($request->user()->saldo < $dadosTransferencia['valor']) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Saldo insuficiente'
            ]);
        }

        $usuarioDestino = Usuario::where('email', '=', $dadosTransferencia['email'])->first();
        
        if(!$usuarioDestino) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Usuário não encontrado'
            ]);
        }
        $usuario = $request->user();
        $transferencia = Transferencia::create([
            'usuario_id' => $usuario->id,
            'usuario_destino_id' => $usuarioDestino->id,
            'valor' => $dadosTransferencia['valor'],
            'descricao' => $dadosTransferencia['descricao']
        ]);

        if(!$transferencia) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Não foi possível realizar a transferência'
            ]);
        }
        $usuario->atualizarSaldo(-$transferencia->valor);
        $usuarioDestino->atualizarSaldo($transferencia->valor);
        return response()->json([], 201);
    }
}
