<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImgxprodTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('imgxprod', function (Blueprint $table) {
            $table->id(); // Clave primaria
            $table->unsignedBigInteger('id_prod'); // Clave foránea a productos
            $table->string('img'); // Ruta o nombre de la imagen
            $table->timestamps(); // Para created_at y updated_at

            // Relaciones
            $table->foreign('id_prod')->references('id')->on('productos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('imgxprod');
    }
}

