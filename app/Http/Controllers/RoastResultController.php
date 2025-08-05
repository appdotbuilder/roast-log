<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoastResultRequest;
use App\Models\RoastResult;
use App\Models\RoastRecipe;
use Inertia\Inertia;

class RoastResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $results = RoastResult::with(['recipe', 'user'])
            ->where('user_id', auth()->id())
            ->latest('roast_date')
            ->paginate(10);
        
        return Inertia::render('roast-results/index', [
            'results' => $results
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $recipes = RoastRecipe::where('user_id', auth()->id())
            ->orderBy('name')
            ->get(['id', 'name']);
        
        return Inertia::render('roast-results/create', [
            'recipes' => $recipes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoastResultRequest $request)
    {
        $result = RoastResult::create([
            'user_id' => auth()->id(),
            ...$request->validated()
        ]);

        return redirect()->route('roast-results.show', $result)
            ->with('success', 'Roast result recorded successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(RoastResult $roastResult)
    {
        if ($roastResult->user_id !== auth()->id()) {
            abort(403);
        }
        
        $roastResult->load('recipe');
        
        return Inertia::render('roast-results/show', [
            'result' => $roastResult
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RoastResult $roastResult)
    {
        if ($roastResult->user_id !== auth()->id()) {
            abort(403);
        }
        
        $recipes = RoastRecipe::where('user_id', auth()->id())
            ->orderBy('name')
            ->get(['id', 'name']);
        
        return Inertia::render('roast-results/edit', [
            'result' => $roastResult,
            'recipes' => $recipes
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreRoastResultRequest $request, RoastResult $roastResult)
    {
        if ($roastResult->user_id !== auth()->id()) {
            abort(403);
        }
        
        $roastResult->update($request->validated());

        return redirect()->route('roast-results.show', $roastResult)
            ->with('success', 'Roast result updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RoastResult $roastResult)
    {
        if ($roastResult->user_id !== auth()->id()) {
            abort(403);
        }
        
        $roastResult->delete();

        return redirect()->route('roast-results.index')
            ->with('success', 'Roast result deleted successfully.');
    }
}