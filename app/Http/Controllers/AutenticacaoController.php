<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AutenticacaoController extends Controller
{
    public function cadastrarUsuario(Request $request)
    {
        $dadosUsuario = $request->validate([
            'nome' => 'required|max:60',
            'email' => 'required|email|unique:usuarios',
            'senha' => 'required|confirmed:confirmarSenha',
            'confirmarSenha' => 'required'
        ]);
        $senha = Hash::make($dadosUsuario['senha']);
        Usuario::create([
            'nome' => $dadosUsuario['nome'],
            'email' => $dadosUsuario['email'],
            'senha' => $senha
        ]);

        return response()->json([], 201);
    }

    public function autenticar(Request $request)
    {
        $validarCredenciais = $request->validate([
            'email' => 'required|email',
            'senha' => 'required'
        ]);

        $credenciais = [
            'email' => $validarCredenciais["email"],
            'password' => $validarCredenciais["senha"]
        ];
        if(!Auth::attempt($credenciais)) {
            return response()->json([
                'sucesso' => false,
                'mensagem' => 'Credenciais inválidas'
            ]);
        }

        $request->session()->regenerate();
        $usuario = $request->user();

        return response()->json([
            'nome' => $usuario->nome,
            'email' => $usuario->email
        ]);
    }
    public function encerrarSessao(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // $request->user()->currentAccessToken()->delete();

        return response()->json([
            'sucesso' => true,
            'mensagem' => 'Logout realizado com sucesso'
        ]);
    }
}
