<?php

namespace Database\Factories;

use App\Models\FormEndpoint;
use App\Models\FormSubmission;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FormSubmission>
 */
class FormSubmissionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\FormSubmission>
     */
    protected $model = FormSubmission::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'form_endpoint_id' => FormEndpoint::factory(),
            'data' => [
                'name' => fake()->name(),
                'email' => fake()->email(),
                'message' => fake()->paragraph(),
            ],
            'ip_address' => fake()->ipv4(),
            'user_agent' => fake()->userAgent(),
        ];
    }
}