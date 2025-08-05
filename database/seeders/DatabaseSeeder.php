<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create products for the store
        Product::factory(20)->create();
        
        // Update some products to have higher sales counts for best sellers
        Product::inRandomOrder()
            ->take(5)
            ->get()
            ->each(function ($product) {
                $product->update(['sales_count' => random_int(50, 200)]);
            });
    }
}