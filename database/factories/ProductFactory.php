<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Product>
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $origins = [
            'Ethiopian Yirgacheffe',
            'Colombian Supremo',
            'Guatemalan Antigua',
            'Jamaican Blue Mountain',
            'Hawaiian Kona',
            'Brazilian Santos',
            'Kenyan AA',
            'Costa Rican Tarrazú',
            'Peruvian Organic',
            'Tanzanian Peaberry'
        ];

        $roastLevels = ['light', 'medium', 'dark'];
        $weights = [250, 500, 1000];
        
        $origin = $this->faker->randomElement($origins);
        $roastLevel = $this->faker->randomElement($roastLevels);
        $weight = $this->faker->randomElement($weights);

        return [
            'name' => $origin . ' ' . ucfirst($roastLevel) . ' Roast',
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 8.99, 24.99),
            'bean_origin' => $origin,
            'roast_level' => $roastLevel,
            'weight_grams' => $weight,
            'stock_quantity' => $this->faker->numberBetween(0, 50),
            'sales_count' => $this->faker->numberBetween(0, 100),
            'is_active' => true,
        ];
    }
}