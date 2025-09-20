<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AutenticacaoController;

Route::prefix('v1')->group(function() {
    Route::post('/conta/cadastrar', [AutenticacaoController::class, 'cadastrarUsuario']);
    Route::post('/conta/autenticar', [AutenticacaoController::class, 'autenticar']);
    Route::post('/conta/sair', [AutenticacaoController::class, 'encerrarSessao']);
});