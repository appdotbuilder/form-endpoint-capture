<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\FormEndpoint;
use App\Models\FormSubmission;
use Illuminate\Http\Request;

class FormSubmissionController extends Controller
{
    /**
     * Store a newly created form submission.
     */
    public function store(Request $request, string $endpointKey)
    {
        $endpoint = FormEndpoint::where('endpoint_key', $endpointKey)->firstOrFail();

        // Get all form data except Laravel's internal fields
        $formData = $request->except(['_token', '_method']);

        FormSubmission::create([
            'form_endpoint_id' => $endpoint->id,
            'data' => $formData,
            'ip_address' => $request->ip(),
            'user_agent' => $request->header('User-Agent'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Form submitted successfully!'
        ], 201);
    }
}