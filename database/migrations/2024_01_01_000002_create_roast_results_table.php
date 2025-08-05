<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roast_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('roast_recipe_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('roast_date');
            $table->text('taste_notes')->nullable();
            $table->integer('rating')->comment('Rating from 1-5 stars');
            $table->integer('batch_size')->nullable()->comment('Batch size in grams');
            $table->text('observations')->nullable();
            $table->timestamps();
            
            $table->index('roast_recipe_id');
            $table->index('user_id');
            $table->index('rating');
            $table->index('roast_date');
            $table->index(['user_id', 'roast_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roast_results');
    }
};