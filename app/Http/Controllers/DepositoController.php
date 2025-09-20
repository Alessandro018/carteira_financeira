<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Deposito;
use App\Models\Usuario;
use Illuminate\Http\Request;

class DepositoController extends Controller
{
    public function realizarDeposito(Request $request)
    {
        $validarDados = $request->validate([
            'valor' => 'required|numeric',
            'descricao' => 'max:80'
        ]);

        $usuario = $request->user();
        // $buscarUsuarioDestino = Usuario::where('email', '=', $validarDados['email'])->first();

        // if(!$buscarUsuarioDestino) {
        //     return response()->json([
        //         'sucesso' => false,
        //         'mensagem' => 'Usuário não encontrado'
        //     ]);
        // }
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
}
