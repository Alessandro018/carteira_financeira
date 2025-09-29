<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Deposito;
use Illuminate\Http\Request;

class DepositoController extends Controller
{
    public function realizarDeposito(Request $request)
    {
        $validarDados = $request->validate([
            'valor' => 'required|numeric',
            'descricao' => 'max:80'
        ], [
            'valor.required' => 'O campo valor é obrigatório',
            'valor.numeric' => 'O campo valor deve ser um número válido',
            'descricao.max' => 'O campo descrição deve ter no máximo :max caracteres'
        ]);

        if($validarDados['valor'] <= 0) {
            return response()->json([
                'sucesso' => false,
                'erros' => [
                    'valor' => ['O valor do depósito deve ser maior que zero']
                ]
            ]);
        }

        $usuario = $request->user();
        $deposito = Deposito::create([
            'usuario_id' => $usuario->id,
            'valor' => $validarDados['valor'],
            'descricao' => $validarDados['descricao']
        ]);

        if(!$deposito) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Não foi possível realizar o depósito'
            ]);
        }
        $usuario->atualizarSaldo($deposito->valor);
        return response()->json([], 201);
    }

    public function cancelarDeposito(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ], [
            'id.required' => 'O campo id é obrigatório',
        ]);

        $usuario = $request->user();
        $deposito = Deposito::where('id', '=', $request->id)->where('usuario_id', '=', $usuario->id)->first();
        
        if(!$deposito) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Depósito não encontrado'
            ]);
        }

        $depositoCancelado = $deposito->cancelar();
        if(!$depositoCancelado) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Não foi possível cancelar o depósito'
            ]);
        }

        $request->user()->atualizarSaldo(-$deposito->valor);
        return response()->json([], 204);
    }
}
