<?php

use App\Http\Controllers\FormEndpointController;
use App\Http\Controllers\FormSubmissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Form endpoint management routes
Route::get('/', [FormEndpointController::class, 'index'])->name('home');
Route::post('/endpoints', [FormEndpointController::class, 'store'])->name('endpoints.store');
Route::get('/endpoints/{endpoint:id}', [FormEndpointController::class, 'show'])->name('endpoints.show');
Route::delete('/endpoints/{endpoint:id}', [FormEndpointController::class, 'destroy'])->name('endpoints.destroy');

// Form submission route (public API endpoint)
Route::post('/submit/{endpointKey}', [FormSubmissionController::class, 'store'])->name('submissions.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
