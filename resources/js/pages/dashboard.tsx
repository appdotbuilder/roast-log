import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import Heading from '@/components/heading';



export default function Dashboard() {
    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <Heading title="☕ Coffee Roasting Dashboard" />
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* Roast Recipes */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="text-4xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold mb-3">Roast Recipes</h3>
                        <p className="text-gray-600 mb-4">
                            Create and manage your coffee roasting recipes with detailed parameters and notes.
                        </p>
                        <Link href="/roast-recipes">
                            <Button className="w-full bg-amber-600 hover:bg-amber-700">
                                View Recipes
                            </Button>
                        </Link>
                    </div>

                    {/* Roast Results */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="text-4xl mb-4">⭐</div>
                        <h3 className="text-xl font-semibold mb-3">Roast Results</h3>
                        <p className="text-gray-600 mb-4">
                            Track and rate your roasting results with taste notes and detailed observations.
                        </p>
                        <Link href="/roast-results">
                            <Button className="w-full bg-green-600 hover:bg-green-700">
                                View Results
                            </Button>
                        </Link>
                    </div>

                    {/* Shop */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="text-4xl mb-4">🛒</div>
                        <h3 className="text-xl font-semibold mb-3">Coffee Shop</h3>
                        <p className="text-gray-600 mb-4">
                            Browse and purchase premium coffee beans from our curated collection.
                        </p>
                        <Link href="/products">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                Shop Beans
                            </Button>
                        </Link>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="text-4xl mb-4">✨</div>
                        <h3 className="text-xl font-semibold mb-3">Quick Create</h3>
                        <p className="text-gray-600 mb-4">
                            Jump straight into creating a new recipe or recording a result.
                        </p>
                        <div className="space-y-2">
                            <Link href="/roast-recipes/create">
                                <Button variant="outline" className="w-full">
                                    New Recipe
                                </Button>
                            </Link>
                            <Link href="/roast-results/create">
                                <Button variant="outline" className="w-full">
                                    Record Result
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Cart & Orders */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="text-4xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold mb-3">Orders & Cart</h3>
                        <p className="text-gray-600 mb-4">
                            Manage your shopping cart and view your order history.
                        </p>
                        <div className="space-y-2">
                            <Link href="/cart">
                                <Button variant="outline" className="w-full">
                                    View Cart
                                </Button>
                            </Link>
                            <Link href="/orders">
                                <Button variant="outline" className="w-full">
                                    Order History
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Profile */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="text-4xl mb-4">👤</div>
                        <h3 className="text-xl font-semibold mb-3">Profile</h3>
                        <p className="text-gray-600 mb-4">
                            Manage your account settings and preferences.
                        </p>
                        <Link href="/settings">
                            <Button variant="outline" className="w-full">
                                Account Settings
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity Placeholder */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">🚀 Get Started</h3>
                    <p className="text-gray-600 mb-4">
                        Welcome to your coffee roasting journey! Start by creating your first recipe or exploring our premium bean collection.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/roast-recipes/create">
                            <Button className="bg-amber-600 hover:bg-amber-700">
                                Create First Recipe
                            </Button>
                        </Link>
                        <Link href="/products">
                            <Button variant="outline">
                                Browse Coffee Beans
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}