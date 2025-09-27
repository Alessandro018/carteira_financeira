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
    public function atualizarSaldo(float $valor)
    {
        $this->saldo += $valor;
        $this->save();
    }
    
    public function depositos(string $data, ?string $dataFim)
    {
        $depositos = Deposito::where('usuario_id', $this->id);
        $depositosFiltrados = $dataFim ? $depositos->whereDate('data_hora_criacao', ">=", $data)->whereDate('data_hora_criacao', "<=", $dataFim)->get() : 
            $depositos->whereDate('data_hora_criacao', $data)->get();
        return $depositosFiltrados;
    }
    public function transferencias(string $data, ?string $dataFim)
    {
        $transferencias = Transferencia::where('usuario_id', $this->id);
        $transferenciasFiltradas = $dataFim ? $transferencias->whereDate('data_hora_criacao', '>=', $data)->whereDate('data_hora_criacao', "<=", $dataFim)->get() :
            $transferencias->whereDate('data_hora_criacao', $data)->get();
        return $transferenciasFiltradas;
    }
}
