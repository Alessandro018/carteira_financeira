<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function transacoes(Request $request)
    {
        $usuario = $request->user();
        $transacoes = $usuario->load(['depositos', 'transferencias']);

        return response()->json(
            [
                'depositos' => $transacoes['depositos'],
                'transferencias' => $transacoes['transferencias']
            ]
        );
    }
    public function saldo(Request $request)
    {
        $usuario = $request->user();
        return response()->json($usuario->saldo);
    }
}
