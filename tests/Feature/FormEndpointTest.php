<?php

use App\Models\FormEndpoint;
use App\Models\FormSubmission;

it('can view home page with endpoints', function () {
    $endpoint = FormEndpoint::factory()->create();
    
    $response = $this->get('/');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($assert) => $assert
        ->component('welcome')
        ->has('endpoints', 1)
        ->has('endpoints.0', fn ($assert) => $assert
            ->where('id', $endpoint->id)
            ->where('name', $endpoint->name)
            ->etc()
        )
    );
});

it('can create form endpoint', function () {
    $response = $this->post('/endpoints', [
        'name' => 'Test Contact Form',
        'description' => 'A test form for collecting contact information',
    ]);

    $response->assertRedirect('/');
    $response->assertSessionHas('success', 'Form endpoint created successfully!');

    $this->assertDatabaseHas('form_endpoints', [
        'name' => 'Test Contact Form',
        'description' => 'A test form for collecting contact information',
    ]);

    $endpoint = FormEndpoint::where('name', 'Test Contact Form')->first();
    expect($endpoint->endpoint_key)->not->toBeEmpty();
    expect(strlen($endpoint->endpoint_key))->toBe(32);
});

it('can view endpoint details', function () {
    $endpoint = FormEndpoint::factory()
        ->has(FormSubmission::factory()->count(2), 'submissions')
        ->create();

    $response = $this->get("/endpoints/{$endpoint->id}");

    $response->assertStatus(200);
    $response->assertInertia(fn ($assert) => $assert
        ->component('endpoint-detail')
        ->has('endpoint', fn ($assert) => $assert
            ->where('id', $endpoint->id)
            ->where('name', $endpoint->name)
            ->has('submissions', 2)
            ->etc()
        )
    );
});

it('can delete form endpoint', function () {
    $endpoint = FormEndpoint::factory()->create();

    $response = $this->delete("/endpoints/{$endpoint->id}");

    $response->assertRedirect('/');
    $response->assertSessionHas('success', 'Form endpoint deleted successfully!');

    $this->assertDatabaseMissing('form_endpoints', [
        'id' => $endpoint->id,
    ]);
});

it('can submit form data', function () {
    $endpoint = FormEndpoint::factory()->create();

    $formData = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'message' => 'Hello, this is a test message.',
    ];

    $response = $this->post("/submit/{$endpoint->endpoint_key}", $formData);

    $response->assertStatus(201);
    $response->assertJson([
        'success' => true,
        'message' => 'Form submitted successfully!',
    ]);

    $this->assertDatabaseHas('form_submissions', [
        'form_endpoint_id' => $endpoint->id,
        'data' => json_encode($formData),
    ]);

    $submission = FormSubmission::where('form_endpoint_id', $endpoint->id)->first();
    expect($submission->data)->toBe($formData);
    expect($submission->ip_address)->not->toBeNull();
});

it('handles form submission with invalid endpoint key', function () {
    $response = $this->post('/submit/invalid-key', [
        'name' => 'John Doe',
    ]);

    $response->assertStatus(404);
});

it('validates form endpoint creation', function () {
    $response = $this->post('/endpoints', [
        'name' => '', // Required field
        'description' => str_repeat('a', 1001), // Too long
    ]);

    $response->assertSessionHasErrors(['name', 'description']);
});