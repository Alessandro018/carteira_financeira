<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'usuarios';
    protected $primaryKey = 'id';
    const CREATED_AT = 'data_criacao';
    const UPDATED_AT = 'data_atualizacao';
    protected $fillable = [
        'nome',
        'email',
        'senha',
        'saldo'
    ];

    protected $hidden = [
        'senha',
    ];

    public function getAuthPassword()
    {
        return $this->senha;
    }

    public function validarSenha(string $senha)
    {
        return Hash::check($senha, $this->senha);
    }
    
    public function depositos()
    {
        return $this->hasMany(Deposito::class);
    }
    public function atualizarSaldo(float $valor)
    {
        $this->saldo += $valor;
        $this->save();
    }
    public function transferencias()
    {
        return $this->hasMany(Transferencia::class);
    }
}
