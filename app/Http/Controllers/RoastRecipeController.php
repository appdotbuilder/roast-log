<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoastRecipeRequest;
use App\Http\Requests\UpdateRoastRecipeRequest;
use App\Models\RoastRecipe;
use Inertia\Inertia;

class RoastRecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $recipes = RoastRecipe::with('results')
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(10);
        
        return Inertia::render('roast-recipes/index', [
            'recipes' => $recipes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('roast-recipes/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoastRecipeRequest $request)
    {
        $recipe = RoastRecipe::create([
            'user_id' => auth()->id(),
            ...$request->validated()
        ]);

        return redirect()->route('roast-recipes.show', $recipe)
            ->with('success', 'Roast recipe created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(RoastRecipe $roastRecipe)
    {
        if ($roastRecipe->user_id !== auth()->id()) {
            abort(403);
        }
        
        $roastRecipe->load(['results' => function ($query) {
            $query->latest('roast_date');
        }]);
        
        return Inertia::render('roast-recipes/show', [
            'recipe' => $roastRecipe
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RoastRecipe $roastRecipe)
    {
        if ($roastRecipe->user_id !== auth()->id()) {
            abort(403);
        }
        
        return Inertia::render('roast-recipes/edit', [
            'recipe' => $roastRecipe
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoastRecipeRequest $request, RoastRecipe $roastRecipe)
    {
        $roastRecipe->update($request->validated());

        return redirect()->route('roast-recipes.show', $roastRecipe)
            ->with('success', 'Roast recipe updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RoastRecipe $roastRecipe)
    {
        if ($roastRecipe->user_id !== auth()->id()) {
            abort(403);
        }
        
        $roastRecipe->delete();

        return redirect()->route('roast-recipes.index')
            ->with('success', 'Roast recipe deleted successfully.');
    }
}