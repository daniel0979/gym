<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role', 20)->default('member');
            $table->string('status', 20)->default('active');
            $table->string('phone', 25)->nullable();
            $table->string('address')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('gender', 20)->nullable();
            $table->string('emergency_contact_name', 100)->nullable();
            $table->string('emergency_contact_phone', 25)->nullable();
            $table->date('joined_at')->nullable();

            $table->index(['role', 'status']);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role', 'status']);
            $table->dropColumn([
                'role',
                'status',
                'phone',
                'address',
                'date_of_birth',
                'gender',
                'emergency_contact_name',
                'emergency_contact_phone',
                'joined_at',
            ]);
        });
    }
};
