<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::active()
            ->latest()
            ->paginate(12);
        
        $bestSelling = Product::active()
            ->bestSelling()
            ->take(6)
            ->get();
        
        return Inertia::render('products/index', [
            'products' => $products,
            'bestSelling' => $bestSelling
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('products/show', [
            'product' => $product
        ]);
    }
}