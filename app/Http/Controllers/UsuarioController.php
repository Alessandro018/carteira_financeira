<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function criar(Request $request)
    {
        $validator = $request->validate([
            'nome' => 'required|max:60',
            'email' => 'required|email|unique:usuarios',
            'senha' => 'required|confirmed:confirmarSenha',
            'confirmarSenha' => 'required'
        ]);
        $usuario = Usuario::create($request->all());
        return response()->json($usuario, 201);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
