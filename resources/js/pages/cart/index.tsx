import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import Heading from '@/components/heading';

interface Product {
    id: number;
    name: string;
    price: string;
    bean_origin: string;
    roast_level: string;
    weight_grams: number;
}

interface CartItem {
    id: number;
    quantity: number;
    product: Product;
}

interface Props {
    cartItems: CartItem[];
    total: number;
    [key: string]: unknown;
}

export default function CartIndex({ cartItems, total }: Props) {
    const formatPrice = (price: string | number) => `£${parseFloat(price.toString()).toFixed(2)}`;

    const updateQuantity = (itemId: number, quantity: number) => {
        if (quantity < 1) return;
        
        router.patch(route('cart.update', itemId), {
            quantity: quantity
        });
    };

    const removeItem = (itemId: number, productName: string) => {
        if (confirm(`Remove "${productName}" from cart?`)) {
            router.delete(route('cart.destroy', itemId));
        }
    };

    const getItemTotal = (item: CartItem) => {
        return parseFloat(item.product.price) * item.quantity;
    };

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/products">
                            <Button variant="outline" size="sm">
                                ← Continue Shopping
                            </Button>
                        </Link>
                        <Heading title="🛒 Shopping Cart" />
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <div className="text-6xl mb-4">🛒</div>
                            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                            <p className="text-gray-600 mb-6">
                                Discover our premium coffee beans and start building your perfect order
                            </p>
                            <Link href="/products">
                                <Button className="bg-amber-600 hover:bg-amber-700">
                                    Shop Coffee Beans
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-20 h-20 bg-amber-100 rounded-lg flex items-center justify-center">
                                                <span className="text-2xl">☕</span>
                                            </div>
                                            
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{item.product.name}</h3>
                                                <p className="text-gray-600 text-sm">
                                                    {item.product.bean_origin} • {item.product.roast_level} roast • {item.product.weight_grams}g
                                                </p>
                                                <p className="text-amber-600 font-medium mt-1">
                                                    {formatPrice(item.product.price)} each
                                                </p>
                                            </div>
                                            
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center border rounded-md">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="px-3 py-1 hover:bg-gray-100"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-3 py-1 border-l border-r">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-3 py-1 hover:bg-gray-100"
                                                        disabled={item.quantity >= 10}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                
                                                <div className="text-right">
                                                    <div className="font-semibold">
                                                        {formatPrice(getItemTotal(item))}
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id, item.product.name)}
                                                        className="text-red-600 hover:text-red-700 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                                    
                                    <div className="space-y-2 mb-4">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="flex justify-between text-sm">
                                                <span>{item.product.name} × {item.quantity}</span>
                                                <span>{formatPrice(getItemTotal(item))}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-lg font-semibold">Total:</span>
                                            <span className="text-xl font-bold text-amber-600">
                                                {formatPrice(total)}
                                            </span>
                                        </div>
                                        
                                        <Link href="/orders/create">
                                            <Button className="w-full bg-amber-600 hover:bg-amber-700">
                                                🚀 Proceed to Checkout
                                            </Button>
                                        </Link>
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t">
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span>🚚</span>
                                                <span>Free delivery on orders over £25</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span>🏦</span>
                                                <span>Secure bank transfer payment</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span>☕</span>
                                                <span>Freshly roasted to order</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}