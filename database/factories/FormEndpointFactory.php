<?php

namespace Database\Factories;

use App\Models\FormEndpoint;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FormEndpoint>
 */
class FormEndpointFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\FormEndpoint>
     */
    protected $model = FormEndpoint::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'endpoint_key' => Str::random(32),
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
        ];
    }
}