<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('dashboard');
});

Route::get('/transferencia', function () {
    return Inertia::render('transferencia');
});

Route::get('/deposito', function () {
    return Inertia::render('deposito');
});
