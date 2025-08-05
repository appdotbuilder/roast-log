<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddToCartRequest;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the cart.
     */
    public function index()
    {
        $cartItems = CartItem::with('product')
            ->where('user_id', auth()->id())
            ->get();
        
        $total = $cartItems->sum(function ($item) {
            return (float) $item->product->price * $item->quantity;
        });
        
        return Inertia::render('cart/index', [
            'cartItems' => $cartItems,
            'total' => $total
        ]);
    }

    /**
     * Add item to cart.
     */
    public function store(AddToCartRequest $request)
    {
        $validated = $request->validated();
        
        $cartItem = CartItem::where('user_id', auth()->id())
            ->where('product_id', $validated['product_id'])
            ->first();
        
        if ($cartItem) {
            $cartItem->quantity += $validated['quantity'];
            $cartItem->save();
        } else {
            CartItem::create([
                'user_id' => auth()->id(),
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity']
            ]);
        }
        
        return redirect()->back()
            ->with('success', 'Item added to cart successfully.');
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request, CartItem $cartItem)
    {
        if ($cartItem->user_id !== auth()->id()) {
            abort(403);
        }
        
        $request->validate([
            'quantity' => 'required|integer|min:1|max:10'
        ]);
        
        $cartItem->update(['quantity' => $request->quantity]);
        
        return redirect()->back()
            ->with('success', 'Cart updated successfully.');
    }

    /**
     * Remove item from cart.
     */
    public function destroy(CartItem $cartItem)
    {
        if ($cartItem->user_id !== auth()->id()) {
            abort(403);
        }
        
        $cartItem->delete();
        
        return redirect()->back()
            ->with('success', 'Item removed from cart successfully.');
    }
}