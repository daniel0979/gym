<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('duration_minutes')->default(60);
            $table->unsignedSmallInteger('capacity')->default(20);
            $table->string('difficulty', 20)->default('all');
            $table->foreignId('trainer_id')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['is_active', 'difficulty']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
