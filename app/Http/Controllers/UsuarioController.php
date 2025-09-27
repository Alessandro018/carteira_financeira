<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Deposito;
use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function transacoes(Request $request)
    {
        $usuario = $request->user();
        $dataInicio = $request->input('dataInicio');
        $dataFim = $request->input('dataFim');
        $validarData = $request->validate([
            'dataInicio' => 'required|date',
        ], [
            'dataInicio.required' => 'O campo data é obrigatório',
            'dataInicio.date' => 'O campo data deve ser uma data válida'
        ]);
        $depositos = $usuario->depositos($dataInicio, $dataFim);
        $transferencias = $usuario->transferencias($dataInicio, $dataFim);

        return response()->json(
            [
                'depositos' => $depositos,
                'transferencias' => $transferencias
            ]
        );
    }
    public function saldo(Request $request)
    {
        $usuario = $request->user();
        return response()->json($usuario->saldo);
    }
}
