<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transferencias', function (Blueprint $table) {
            $table->id();
            $table->integer('usuario_id');
            $table->integer('usuario_destino_id');
            $table->double('valor');
            $table->string('descricao', 80)->nullable();
            $table->enum('status', ['Pendente', 'Concluida', 'Cancelada'])->default('Concluida');
            $table->datetime('data_hora_criacao')->useCurrent();
            $table->datetime('data_hora_atualizacao')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transferencias');
    }
};
