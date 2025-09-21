<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('autenticacao/login');
});
Route::get('/login', function () {
    return Inertia::render('autenticacao/login');
});
Route::middleware('auth:sanctum')->group(function() {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    });
    Route::get('/transferir', function () {
        return Inertia::render('transferencia');
    });
    Route::get('/depositar', function () {
        return Inertia::render('deposito');
    });
    Route::get('/transacoes', function () {
        return Inertia::render('transacao');
    });
});
Route::get('/conta/cadastrar', function () {
    return Inertia::render('autenticacao/cadastrar');
});
