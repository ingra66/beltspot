<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdxcarrTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prodxcarr', function (Blueprint $table) {
            $table->id(); // Clave primaria
            $table->unsignedBigInteger('id_prod'); // Clave foránea a productos
            $table->unsignedBigInteger('id_carr'); // Clave foránea a carrito
            $table->integer('cantidad'); // Cantidad de productos
            $table->decimal('precio', 10, 2); // Precio de cada producto
            $table->timestamps(); // Para created_at y updated_at

            // Relaciones
            $table->foreign('id_prod')->references('id')->on('productos')->onDelete('cascade');
            $table->foreign('id_carr')->references('id')->on('carrito')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prodxcarr');
    }
}
