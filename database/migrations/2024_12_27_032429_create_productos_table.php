<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id(); // ID (Primary Key)
            $table->unsignedBigInteger('categoria'); // FK de categoría
            $table->unsignedBigInteger('subcategoria'); // FK de subcategoría
            $table->string('nombre'); // Nombre del producto
            $table->text('descripcion')->nullable(); // Descripción (opcional)
            $table->integer('stock'); // Cantidad de stock
            $table->boolean('ver_act')->default(true); // Si está activo o visible
            $table->decimal('precio_reg', 10, 2); // Precio regular
            $table->decimal('precio_ofert', 10, 2)->nullable(); // Precio de oferta (opcional)
            $table->boolean('act_ofert')->default(false); // Si la oferta está activa

            // Claves foráneas
            $table->foreign('categoria')->references('id')->on('categorias')->onDelete('cascade');
            $table->foreign('subcategoria')->references('id')->on('subcategorias')->onDelete('cascade');

            $table->timestamps(); // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
