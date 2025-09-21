<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transferencia extends Model
{
    protected $table = 'transferencias';
    protected $primaryKey = 'id';
    const CREATED_AT = 'data_hora_criacao';
    const UPDATED_AT = 'data_hora_atualizacao';
    protected $fillable = [
        'usuario_id',
        'usuario_destino_id',
        'valor',
        'descricao',
        'status'
    ];

    public function cancelar() {
        $this->status = 'Cancelada';
        return $this->save();
    }
}
