<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with('items.product')
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(10);
        
        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $cartItems = CartItem::with('product')
            ->where('user_id', auth()->id())
            ->get();
        
        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')
                ->with('error', 'Your cart is empty.');
        }
        
        $total = $cartItems->sum(function ($item) {
            return (float) $item->product->price * $item->quantity;
        });
        
        return Inertia::render('orders/create', [
            'cartItems' => $cartItems,
            'total' => $total
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $cartItems = CartItem::with('product')
            ->where('user_id', auth()->id())
            ->get();
        
        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')
                ->with('error', 'Your cart is empty.');
        }
        
        $total = $cartItems->sum(function ($item) {
            return (float) $item->product->price * $item->quantity;
        });
        
        DB::transaction(function () use ($request, $cartItems, $total) {
            $order = Order::create([
                'user_id' => auth()->id(),
                'order_number' => 'ORD-' . strtoupper(Str::random(8)),
                'total_amount' => $total,
                'status' => 'pending',
                'payment_status' => 'pending',
                'payment_method' => 'bank_transfer',
                'shipping_address' => $request->shipping_address,
                'notes' => $request->notes,
            ]);
            
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'unit_price' => $cartItem->product->price,
                    'total_price' => (float) $cartItem->product->price * $cartItem->quantity,
                ]);
                
                // Update product sales count
                $cartItem->product->increment('sales_count', $cartItem->quantity);
            }
            
            // Clear cart
            CartItem::where('user_id', auth()->id())->delete();
            
            $this->order = $order;
        });
        
        return redirect()->route('orders.show', $this->order)
            ->with('success', 'Order placed successfully! You will receive bank transfer details via email.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }
        
        $order->load('items.product');
        
        return Inertia::render('orders/show', [
            'order' => $order,
            'bankDetails' => [
                'bank_name' => 'Coffee Bank',
                'account_name' => 'Coffee Roasters Ltd',
                'account_number' => '1234567890',
                'sort_code' => '12-34-56',
                'reference' => $order->order_number
            ]
        ]);
    }

    /**
     * Property to store order during transaction.
     */
    private $order;
}