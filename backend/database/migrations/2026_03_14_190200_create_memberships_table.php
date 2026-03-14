<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('plan_id')->constrained('membership_plans');
            $table->date('starts_at');
            $table->date('ends_at')->nullable();
            $table->string('status', 20)->default('active');
            $table->boolean('auto_renew')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['plan_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('memberships');
    }
};
