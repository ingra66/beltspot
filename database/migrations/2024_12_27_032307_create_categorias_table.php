<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriasTable extends Migration
{
    public function up()
    {
        Schema::create('categorias', function (Blueprint $table) {
            $table->id(); // ID (Primary Key)
            $table->string('nombre'); // Nombre de la categoría
            $table->string('img')->nullable(); // Imagen asociada a la categoría (opcional)
            $table->timestamps(); // created_at y updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('categorias');
    }
}

