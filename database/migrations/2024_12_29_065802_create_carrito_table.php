<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarritoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carrito', function (Blueprint $table) {
            $table->id(); // Clave primaria
            $table->unsignedBigInteger('id_user'); // Clave foránea a usuarios
            $table->date('fech_inicio'); // Fecha de inicio del carrito
            $table->date('fech_actu')->nullable(); // Fecha de última actualización
            $table->string('estado'); // Estado del carrito
            $table->string('metodo_pago')->nullable(); // Método de pago
            $table->decimal('precio_total', 10, 2)->default(0); // Precio total del carrito
            $table->timestamps(); // Para created_at y updated_at

            // Relaciones
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carrito');
    }
}

