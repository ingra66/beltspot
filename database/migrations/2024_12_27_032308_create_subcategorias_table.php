<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubcategoriasTable extends Migration
{
    public function up()
    {
        Schema::create('subcategorias', function (Blueprint $table) {
            $table->id(); // ID (Primary Key)
            $table->unsignedBigInteger('id_cat'); // FK de la categoría
            $table->string('img')->nullable(); // Imagen asociada a la subcategoría (opcional)

            // Clave foránea
            $table->foreign('id_cat')->references('id')->on('categorias')->onDelete('cascade');

            $table->timestamps(); // created_at y updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('subcategorias');
    }
}
