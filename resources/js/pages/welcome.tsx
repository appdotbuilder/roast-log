import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    bean_origin: string;
    roast_level: string;
    weight_grams: number;
    sales_count: number;
}

interface Recipe {
    id: number;
    name: string;
    duration_minutes: number;
    roast_level: string | null;
    bean_origin: string | null;
}

interface Result {
    id: number;
    rating: number;
    roast_date: string;
    taste_notes: string | null;
    recipe: Recipe;
}

interface Props {
    bestSellingProducts: Product[];
    recentRecipes: Recipe[];
    recentResults: Result[];
    isAuthenticated: boolean;
    [key: string]: unknown;
}

export default function Welcome({ bestSellingProducts, recentRecipes, recentResults, isAuthenticated }: Props) {
    const formatPrice = (price: string) => `£${parseFloat(price).toFixed(2)}`;
    
    const renderStars = (rating: number) => '⭐'.repeat(rating);

    return (
        <AppShell>
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
                {/* Hero Section */}
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center mb-16">
                        <h1 className="text-6xl font-bold text-gray-900 mb-6">
                            ☕ Coffee Roasting Studio
                        </h1>
                        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
                            Master the art of coffee roasting with our comprehensive platform. 
                            Record recipes, track results, and explore premium roasted beans from our collection.
                        </p>
                        
                        {!isAuthenticated ? (
                            <div className="flex gap-4 justify-center">
                                <Link href="/login">
                                    <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
                                        🚀 Start Roasting
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="outline" size="lg" className="border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-3">
                                        📝 Create Account
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex gap-4 justify-center">
                                <Link href="/roast-recipes">
                                    <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
                                        📋 My Recipes
                                    </Button>
                                </Link>
                                <Link href="/products">
                                    <Button variant="outline" size="lg" className="border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-3">
                                        🛒 Shop Beans
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">📖</div>
                            <h3 className="text-xl font-semibold mb-3">Recipe Management</h3>
                            <p className="text-gray-600">
                                Create and organize your roasting recipes with detailed parameters, 
                                timing, and notes for consistent results.
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">⭐</div>
                            <h3 className="text-xl font-semibold mb-3">Taste Tracking</h3>
                            <p className="text-gray-600">
                                Record tasting notes and rate each roast batch from 1-5 stars 
                                to perfect your technique over time.
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-4xl mb-4">🛍️</div>
                            <h3 className="text-xl font-semibold mb-3">Premium Beans</h3>
                            <p className="text-gray-600">
                                Shop our curated selection of high-quality green and roasted beans 
                                from around the world with secure ordering.
                            </p>
                        </div>
                    </div>

                    {/* Best Selling Products */}
                    {bestSellingProducts.length > 0 && (
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-center mb-8">🔥 Best Sellers</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {bestSellingProducts.map(product => (
                                    <div key={product.id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{product.bean_origin} • {product.roast_level}</p>
                                        <p className="text-amber-600 font-bold text-xl mb-3">{formatPrice(product.price)}</p>
                                        <p className="text-xs text-gray-500 mb-3">
                                            {product.sales_count} sold • {product.weight_grams}g
                                        </p>
                                        <Link href={`/products/${product.id}`}>
                                            <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-8">
                                <Link href="/products">
                                    <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                                        View All Products →
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Recent Activity for Authenticated Users */}
                    {isAuthenticated && (recentRecipes.length > 0 || recentResults.length > 0) && (
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Recent Recipes */}
                            {recentRecipes.length > 0 && (
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4">📋 Recent Recipes</h3>
                                    <div className="space-y-3">
                                        {recentRecipes.map(recipe => (
                                            <div key={recipe.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <h4 className="font-medium">{recipe.name}</h4>
                                                    <p className="text-sm text-gray-600">
                                                        {recipe.duration_minutes}min • {recipe.roast_level || 'No level set'}
                                                    </p>
                                                </div>
                                                <Link href={`/roast-recipes/${recipe.id}`}>
                                                    <Button size="sm" variant="outline">View</Button>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4">
                                        <Link href="/roast-recipes">
                                            <Button variant="outline" size="sm" className="w-full">
                                                View All Recipes →
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Recent Results */}
                            {recentResults.length > 0 && (
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <h3 className="text-xl font-semibold mb-4">⭐ Recent Results</h3>
                                    <div className="space-y-3">
                                        {recentResults.map(result => (
                                            <div key={result.id} className="p-3 bg-gray-50 rounded-lg">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-medium">{result.recipe.name}</h4>
                                                    <span className="text-xl">{renderStars(result.rating)}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-1">
                                                    {new Date(result.roast_date).toLocaleDateString()}
                                                </p>
                                                {result.taste_notes && (
                                                    <p className="text-sm text-gray-700 italic">
                                                        "{result.taste_notes.substring(0, 60)}..."
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4">
                                        <Link href="/roast-results">
                                            <Button variant="outline" size="sm" className="w-full">
                                                View All Results →
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="text-center mt-16 bg-white rounded-xl p-12 shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Coffee Game?</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Join thousands of coffee enthusiasts perfecting their roasting craft
                        </p>
                        {!isAuthenticated ? (
                            <Link href="/register">
                                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-4">
                                    🎯 Get Started Free
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/roast-recipes/create">
                                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-4">
                                    ➕ Create New Recipe
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}