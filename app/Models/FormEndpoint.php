<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\FormEndpoint
 *
 * @property int $id
 * @property string $endpoint_key
 * @property string $name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\FormSubmission> $submissions
 * @property-read int|null $submissions_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|FormEndpoint newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FormEndpoint newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FormEndpoint query()
 * @method static \Illuminate\Database\Eloquent\Builder|FormEndpoint whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormEndpoint whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormEndpoint whereEndpointKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormEndpoint whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormEndpoint whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormEndpoint whereUpdatedAt($value)
 * @method static \Database\Factories\FormEndpointFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class FormEndpoint extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'endpoint_key',
        'name',
        'description',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the submissions for this form endpoint.
     */
    public function submissions(): HasMany
    {
        return $this->hasMany(FormSubmission::class);
    }
}