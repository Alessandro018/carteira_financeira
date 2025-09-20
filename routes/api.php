<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AutenticacaoController;
use App\Http\Controllers\DepositoController;

Route::prefix('v1')->group(function() {
    Route::post('/conta/cadastrar', [AutenticacaoController::class, 'cadastrarUsuario']);
    Route::post('/conta/autenticar', [AutenticacaoController::class, 'autenticar']);
    Route::post('/conta/sair', [AutenticacaoController::class, 'encerrarSessao']);

    Route::middleware('auth:sanctum')->group(function() {
        Route::post('/conta/depositar', [DepositoController::class, 'realizarDeposito']);
        
    });
});