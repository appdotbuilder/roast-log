<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\RoastRecipe
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string|null $description
 * @property int $duration_minutes
 * @property string|null $bean_origin
 * @property string|null $roast_level
 * @property int|null $temperature
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, RoastResult> $results
 * @property-read int|null $results_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|RoastRecipe newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoastRecipe newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoastRecipe query()
 * @method static \Illuminate\Database\Eloquent\Builder|RoastRecipe whereBeanOrigin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastRecipe whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastRecipe whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastRecipe whereDurationMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastRecipe whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastRecipe whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastRecipe whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastRecipe whereRoastLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastRecipe whereTemperature($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastRecipe whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastRecipe whereUserId($value)
 * @method static \Database\Factories\RoastRecipeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class RoastRecipe extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'duration_minutes',
        'bean_origin',
        'roast_level',
        'temperature',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'duration_minutes' => 'integer',
        'temperature' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the roast recipe.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the roast results for this recipe.
     */
    public function results(): HasMany
    {
        return $this->hasMany(RoastResult::class);
    }
}