<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->double('price');
            $table->string('currency');
            $table->boolean('is_available');
            $table->enum('privacy',['public','private']);
            $table->string('taste');
            $table->text('images');
            $table->dateTime('special_range');
            $table->integer('view');
            $table->foreignId('category_id')->constrained('categories');
            $table->text('description');
            $table->text('remark');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
