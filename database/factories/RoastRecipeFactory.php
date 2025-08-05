<?php

namespace Database\Factories;

use App\Models\RoastRecipe;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoastRecipe>
 */
class RoastRecipeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\RoastRecipe>
     */
    protected $model = RoastRecipe::class;

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
            'Costa Rican Tarrazú'
        ];

        $roastLevels = ['light', 'medium', 'dark'];

        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->optional(0.7)->sentence(),
            'duration_minutes' => $this->faker->numberBetween(8, 25),
            'bean_origin' => $this->faker->randomElement($origins),
            'roast_level' => $this->faker->randomElement($roastLevels),
            'temperature' => $this->faker->numberBetween(180, 250),
            'notes' => $this->faker->optional(0.6)->paragraph(),
        ];
    }
}