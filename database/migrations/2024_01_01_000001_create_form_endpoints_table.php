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
        Schema::create('form_endpoints', function (Blueprint $table) {
            $table->id();
            $table->string('endpoint_key')->unique()->comment('Unique identifier for the form endpoint');
            $table->string('name')->comment('User-friendly name for the endpoint');
            $table->text('description')->nullable()->comment('Optional description of the endpoint');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('endpoint_key');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_endpoints');
    }
};