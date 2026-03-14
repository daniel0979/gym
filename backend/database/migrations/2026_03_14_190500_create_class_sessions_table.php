<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('class_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_id')->constrained('classes')->cascadeOnDelete();
            $table->dateTime('starts_at');
            $table->dateTime('ends_at');
            $table->string('room')->nullable();
            $table->unsignedSmallInteger('capacity')->nullable();
            $table->string('status', 20)->default('scheduled');
            $table->timestamps();

            $table->index(['class_id', 'starts_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('class_sessions');
    }
};
