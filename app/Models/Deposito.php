<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deposito extends Model
{
    protected $table = 'depositos';
    protected $primaryKey = 'id';
    public $timestamps = false;
    const CREATED_AT = 'data_hora_criacao';
    const UPDATED_AT = 'data_hora_atualizacao';

    protected $fillable = [
        'usuario_id',
        'valor',
        'descricao',
        'status'
    ];

    public function cancelar() {
        $this->status = 'Cancelado';
        return $this->save();
    }
}
