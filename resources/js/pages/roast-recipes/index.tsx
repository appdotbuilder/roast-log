import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import Heading from '@/components/heading';

interface Recipe {
    id: number;
    name: string;
    description: string | null;
    duration_minutes: number;
    bean_origin: string | null;
    roast_level: string | null;
    temperature: number | null;
    created_at: string;
    results_count: number;
}

interface PaginationData {
    data: Recipe[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    recipes: PaginationData;
    [key: string]: unknown;
}

export default function RoastRecipesIndex({ recipes }: Props) {
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"? This will also delete all associated roast results.`)) {
            router.delete(route('roast-recipes.destroy', id));
        }
    };

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <Heading title="📋 My Roast Recipes" />
                    <Link href="/roast-recipes/create">
                        <Button className="bg-amber-600 hover:bg-amber-700">
                            ➕ New Recipe
                        </Button>
                    </Link>
                </div>

                {recipes.data.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <div className="text-6xl mb-4">☕</div>
                        <h3 className="text-xl font-semibold mb-2">No recipes yet</h3>
                        <p className="text-gray-600 mb-6">
                            Start your coffee roasting journey by creating your first recipe
                        </p>
                        <Link href="/roast-recipes/create">
                            <Button className="bg-amber-600 hover:bg-amber-700">
                                Create Your First Recipe
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {recipes.data.map(recipe => (
                            <div key={recipe.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <Link href={`/roast-recipes/${recipe.id}`}>
                                            <h3 className="text-xl font-semibold text-gray-900 hover:text-amber-600 cursor-pointer">
                                                {recipe.name}
                                            </h3>
                                        </Link>
                                        {recipe.description && (
                                            <p className="text-gray-600 mt-1">{recipe.description}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Link href={`/roast-recipes/${recipe.id}/edit`}>
                                            <Button variant="outline" size="sm">
                                                ✏️ Edit
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDelete(recipe.id, recipe.name)}
                                        >
                                            🗑️ Delete
                                        </Button>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-700">Duration:</span>
                                        <div className="text-amber-600">{recipe.duration_minutes} minutes</div>
                                    </div>
                                    {recipe.bean_origin && (
                                        <div>
                                            <span className="font-medium text-gray-700">Origin:</span>
                                            <div>{recipe.bean_origin}</div>
                                        </div>
                                    )}
                                    {recipe.roast_level && (
                                        <div>
                                            <span className="font-medium text-gray-700">Roast Level:</span>
                                            <div className="capitalize">{recipe.roast_level}</div>
                                        </div>
                                    )}
                                    <div>
                                        <span className="font-medium text-gray-700">Results:</span>
                                        <Link href={`/roast-results?recipe=${recipe.id}`}>
                                            <div className="text-blue-600 hover:text-blue-700 cursor-pointer">
                                                {recipe.results_count} recorded
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">
                                            Created {new Date(recipe.created_at).toLocaleDateString()}
                                        </span>
                                        <div className="flex gap-2">
                                            <Link href={`/roast-results/create?recipe=${recipe.id}`}>
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                    ⭐ Record Result
                                                </Button>
                                            </Link>
                                            <Link href={`/roast-recipes/${recipe.id}`}>
                                                <Button size="sm" variant="outline">
                                                    👁️ View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {recipes.last_page > 1 && (
                    <div className="flex justify-center mt-8 gap-2">
                        {Array.from({ length: recipes.last_page }, (_, i) => i + 1).map(page => (
                            <Link 
                                key={page}
                                href={`/roast-recipes?page=${page}`}
                                className={`px-3 py-2 rounded ${
                                    page === recipes.current_page 
                                        ? 'bg-amber-600 text-white' 
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}