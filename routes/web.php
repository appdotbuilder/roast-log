<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RoastRecipeController;
use App\Http\Controllers\RoastResultController;
use Illuminate\Support\Facades\Route;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - main functionality
Route::get('/', [HomeController::class, 'index'])->name('home');

// Public product catalog
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

// Dashboard (requires authentication)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('roast-recipes.index');
    })->name('dashboard');
    
    // Roast recipes
    Route::resource('roast-recipes', RoastRecipeController::class);
    
    // Roast results
    Route::resource('roast-results', RoastResultController::class);
    
    // Shopping cart
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::patch('/cart/{cartItem}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');
    
    // Orders
    Route::resource('orders', OrderController::class)->only(['index', 'create', 'store', 'show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
