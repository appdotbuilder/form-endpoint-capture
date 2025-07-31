<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFormEndpointRequest;
use App\Models\FormEndpoint;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FormEndpointController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $endpoints = FormEndpoint::with('submissions')
            ->withCount('submissions')
            ->latest()
            ->get();
        
        return Inertia::render('welcome', [
            'endpoints' => $endpoints
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFormEndpointRequest $request)
    {
        $endpoint = FormEndpoint::create([
            'endpoint_key' => Str::random(32),
            'name' => $request->validated()['name'],
            'description' => $request->validated()['description'],
        ]);

        return redirect()->route('home')
            ->with('success', 'Form endpoint created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(FormEndpoint $endpoint)
    {
        $endpoint->load(['submissions' => function ($query) {
            $query->latest();
        }]);

        return Inertia::render('endpoint-detail', [
            'endpoint' => $endpoint
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FormEndpoint $endpoint)
    {
        $endpoint->delete();

        return redirect()->route('home')
            ->with('success', 'Form endpoint deleted successfully!');
    }
}