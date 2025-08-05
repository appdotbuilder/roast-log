import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import Heading from '@/components/heading';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    bean_origin: string;
    roast_level: string;
    weight_grams: number;
    stock_quantity: number;
    sales_count: number;
    image_url: string | null;
}

interface PaginationData {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    products: PaginationData;
    bestSelling: Product[];
    [key: string]: unknown;
}

export default function ProductsIndex({ products, bestSelling }: Props) {
    const formatPrice = (price: string) => `£${parseFloat(price).toFixed(2)}`;

    const handleAddToCart = (productId: number) => {
        router.post(route('cart.store'), {
            product_id: productId,
            quantity: 1
        });
    };

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <Heading title="☕ Premium Coffee Beans" />
                
                {/* Best Sellers Section */}
                {bestSelling.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6 text-amber-700">🔥 Best Sellers</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bestSelling.map(product => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md p-6 border-2 border-amber-200">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-semibold text-lg">{product.name}</h3>
                                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                                            {product.sales_count} sold
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                                    <div className="text-sm text-gray-500 mb-3">
                                        <div className="flex justify-between">
                                            <span>{product.bean_origin}</span>
                                            <span className="capitalize">{product.roast_level} roast</span>
                                        </div>
                                        <div className="mt-1">{product.weight_grams}g</div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-amber-600">
                                            {formatPrice(product.price)}
                                        </span>
                                        <div className="flex gap-2">
                                            <Link href={`/products/${product.id}`}>
                                                <Button size="sm" variant="outline">View</Button>
                                            </Link>
                                            <Button 
                                                size="sm" 
                                                className="bg-amber-600 hover:bg-amber-700"
                                                onClick={() => handleAddToCart(product.id)}
                                                disabled={product.stock_quantity === 0}
                                            >
                                                {product.stock_quantity === 0 ? 'Out of Stock' : '🛒 Add'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Products */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-6">All Products</h2>
                    {products.data.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <div className="text-6xl mb-4">☕</div>
                            <h3 className="text-xl font-semibold mb-2">No products available</h3>
                            <p className="text-gray-600">Check back soon for our latest coffee offerings</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.data.map(product => (
                                <div key={product.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
                                    <div className="text-sm text-gray-500 mb-3">
                                        <div className="flex justify-between">
                                            <span>{product.bean_origin}</span>
                                            <span className="capitalize">{product.roast_level} roast</span>
                                        </div>
                                        <div className="mt-1 flex justify-between">
                                            <span>{product.weight_grams}g</span>
                                            <span className="text-green-600">
                                                {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-amber-600">
                                            {formatPrice(product.price)}
                                        </span>
                                        <div className="flex gap-2">
                                            <Link href={`/products/${product.id}`}>
                                                <Button size="sm" variant="outline">View</Button>
                                            </Link>
                                            <Button 
                                                size="sm" 
                                                className="bg-amber-600 hover:bg-amber-700"
                                                onClick={() => handleAddToCart(product.id)}
                                                disabled={product.stock_quantity === 0}
                                            >
                                                {product.stock_quantity === 0 ? 'Out' : '🛒'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div className="flex justify-center mt-8 gap-2">
                        {Array.from({ length: products.last_page }, (_, i) => i + 1).map(page => (
                            <Link 
                                key={page}
                                href={`/products?page=${page}`}
                                className={`px-3 py-2 rounded ${
                                    page === products.current_page 
                                        ? 'bg-amber-600 text-white' 
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}

                {/* Shopping Cart Link */}
                <div className="fixed bottom-6 right-6">
                    <Link href="/cart">
                        <Button size="lg" className="bg-amber-600 hover:bg-amber-700 shadow-lg">
                            🛒 Cart
                        </Button>
                    </Link>
                </div>
            </div>
        </AppShell>
    );
}