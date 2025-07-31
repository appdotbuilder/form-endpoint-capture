<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\FormSubmission
 *
 * @property int $id
 * @property int $form_endpoint_id
 * @property array $data
 * @property string|null $ip_address
 * @property string|null $user_agent
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\FormEndpoint $formEndpoint
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|FormSubmission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FormSubmission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FormSubmission query()
 * @method static \Illuminate\Database\Eloquent\Builder|FormSubmission whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormSubmission whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormSubmission whereFormEndpointId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormSubmission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormSubmission whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormSubmission whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormSubmission whereUserAgent($value)
 * @method static \Database\Factories\FormSubmissionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class FormSubmission extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'form_endpoint_id',
        'data',
        'ip_address',
        'user_agent',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'data' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the form endpoint that this submission belongs to.
     */
    public function formEndpoint(): BelongsTo
    {
        return $this->belongsTo(FormEndpoint::class);
    }
}