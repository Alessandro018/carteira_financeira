<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AutenticacaoController;
use App\Http\Controllers\DepositoController;
use App\Http\Controllers\TransferenciaController;
use App\Http\Controllers\UsuarioController;

Route::prefix('v1')->group(function() {
    Route::post('/conta/cadastrar', [AutenticacaoController::class, 'cadastrarUsuario']);
    Route::post('/conta/autenticar', [AutenticacaoController::class, 'autenticar']);
    Route::post('/conta/sair', [AutenticacaoController::class, 'encerrarSessao']);

    Route::middleware('auth:sanctum')->group(function() {
        Route::post('/conta/depositos', [DepositoController::class, 'realizarDeposito']);
        Route::post('/conta/depositos/cancelar', [DepositoController::class, 'cancelarDeposito']);
        Route::post('/conta/transferencias', [TransferenciaController::class, 'realizarTransferencia']);
        Route::post('/conta/transferencias/cancelar', [TransferenciaController::class, 'cancelarTransferencia']);
        Route::get('/conta/transacoes', [UsuarioController::class, 'transacoes']);
        Route::get('/conta/saldo', [UsuarioController::class, 'saldo']);
    });
});