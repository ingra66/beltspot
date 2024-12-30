<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVentaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('venta', function (Blueprint $table) {
            $table->id(); // Clave primaria
            $table->unsignedBigInteger('id_carr'); // Clave foránea a carrito
            $table->unsignedBigInteger('id_user'); // Clave foránea a usuarios
            $table->string('metodo_pago'); // Método de pago
            $table->decimal('total', 10, 2); // Total de la venta
            $table->date('fecha_vent'); // Fecha de la venta
            $table->timestamps(); // Para created_at y updated_at

            // Relaciones
            $table->foreign('id_carr')->references('id')->on('carrito')->onDelete('cascade');
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
        Schema::dropIfExists('venta');
    }
}
