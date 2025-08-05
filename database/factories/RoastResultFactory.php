<?php

namespace Database\Factories;

use App\Models\RoastResult;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoastResult>
 */
class RoastResultFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\RoastResult>
     */
    protected $model = RoastResult::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tasteNotes = [
            'Bright acidity with floral notes',
            'Rich chocolate undertones',
            'Fruity with berry hints',
            'Nutty and smooth finish',
            'Caramel sweetness with vanilla',
            'Earthy with herbal complexity',
            'Citrus brightness and clean finish',
            'Bold and full-bodied'
        ];

        return [
            'roast_date' => $this->faker->dateTimeBetween('-3 months', 'now'),
            'taste_notes' => $this->faker->optional(0.8)->randomElement($tasteNotes),
            'rating' => $this->faker->numberBetween(1, 5),
            'batch_size' => $this->faker->numberBetween(200, 1000),
            'observations' => $this->faker->optional(0.5)->sentence(),
        ];
    }
}