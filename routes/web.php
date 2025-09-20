<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AutenticacaoController;

Route::get('/', function () {
    return Inertia::render('autenticacao/login');
});
Route::middleware('auth:sanctum')->group(function() {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    });
    
});
Route::get('/conta/cadastrar', function () {
    return Inertia::render('autenticacao/cadastrar');
});
Route::get('/transferencia', function () {
    return Inertia::render('transferencia');
});
Route::get('/deposito', function () {
    return Inertia::render('deposito');
});
