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
        Schema::create('form_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_endpoint_id')->constrained()->onDelete('cascade');
            $table->json('data')->comment('The submitted form data as JSON');
            $table->string('ip_address')->nullable()->comment('IP address of the submitter');
            $table->string('user_agent')->nullable()->comment('User agent of the submitter');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('form_endpoint_id');
            $table->index('created_at');
            $table->index(['form_endpoint_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_submissions');
    }
};