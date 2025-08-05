<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\RoastRecipe;
use App\Models\RoastResult;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        $bestSellingProducts = Product::active()
            ->bestSelling()
            ->take(4)
            ->get();
        
        $recentRecipes = [];
        $recentResults = [];
        
        if (auth()->check()) {
            $recentRecipes = RoastRecipe::where('user_id', auth()->id())
                ->latest()
                ->take(3)
                ->get();
            
            $recentResults = RoastResult::with('recipe')
                ->where('user_id', auth()->id())
                ->latest('roast_date')
                ->take(3)
                ->get();
        }
        
        return Inertia::render('welcome', [
            'bestSellingProducts' => $bestSellingProducts,
            'recentRecipes' => $recentRecipes,
            'recentResults' => $recentResults,
            'isAuthenticated' => auth()->check()
        ]);
    }
}