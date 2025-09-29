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
        ], [
            'email.required' => 'O campo email é obrigatório',
            'email.email' => 'O campo email deve ser um email válido',
            'valor.required' => 'O campo valor é obrigatório',
            'valor.numeric' => 'O campo valor deve ser um número válido',
            'descricao.max' => 'O campo descrição deve ter no máximo 80 caracteres',
        ]);

        if($dadosTransferencia['valor'] <= 0) {
            return response()->json([
                'sucesso' => false,
                'erros' => [
                    'valor' => ['O valor da transferência deve ser maior que zero']
                ]
            ]);
        }

        if($dadosTransferencia['email'] == $request->user()->email) {
            return response()->json([
                'sucesso' => false,
                'erros' => [
                    'email' => ['Você não pode transferir para você mesmo']
                ]
            ]);
        }

        if($request->user()->saldo < $dadosTransferencia['valor']) {
            return response()->json([
                'sucesso' => false,
                'erros' => [
                    'valor' => ['Saldo insuficiente']
                ]
            ]);
        }

        $usuarioDestino = Usuario::where('email', '=', $dadosTransferencia['email'])->first();
        
        if(!$usuarioDestino) {
            return response()->json([
                'sucesso' => false,
                'erros' => [
                    'email' => ['Usuário não encontrado']
                ]
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

    public function cancelarTransferencia(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ], [
            'id.required' => 'O campo id é obrigatório',
        ]);

        $usuario = $request->user();
        $transferencia = Transferencia::where('id', '=', $request->id)
        ->where(fn($query) => $query->where('usuario_id', '=', $usuario->id)->orWhere('usuario_destino_id', '=', $usuario->id ))->first();
        
        if(!$transferencia) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Transferência não encontrada'
            ]);
        }

        $transferenciaCancelada = $transferencia->cancelar();
        
        if(!$transferenciaCancelada) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Não foi possível cancelar a transferência'
            ]);
        }

        
        if($transferencia->usuario_id == $usuario->id) {
            $usuarioDestino = Usuario::find($transferencia->usuario_destino_id);
            $usuario->atualizarSaldo($transferencia->valor);
            $usuarioDestino->atualizarSaldo(-$transferencia->valor);
        } else {
            $usuarioOrigem = Usuario::find($transferencia->usuario_id);
            $usuario->atualizarSaldo(-$transferencia->valor);
            $usuarioOrigem->atualizarSaldo($transferencia->valor);
        }
        return response()->json([], 204);
    }
}
