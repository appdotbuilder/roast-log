<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\RoastResult
 *
 * @property int $id
 * @property int $roast_recipe_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon $roast_date
 * @property string|null $taste_notes
 * @property int $rating
 * @property int|null $batch_size
 * @property string|null $observations
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read RoastRecipe $recipe
 * @property-read User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|RoastResult newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoastResult newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoastResult query()
 * @method static \Illuminate\Database\Eloquent\Builder|RoastResult whereBatchSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastResult whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastResult whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastResult whereObservations($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastResult whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastResult whereRoastDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastResult whereRoastRecipeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastResult whereTasteNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastResult whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoastResult whereUserId($value)
 * @method static \Database\Factories\RoastResultFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class RoastResult extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'roast_recipe_id',
        'user_id',
        'roast_date',
        'taste_notes',
        'rating',
        'batch_size',
        'observations',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'roast_date' => 'date',
        'rating' => 'integer',
        'batch_size' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the roast recipe this result belongs to.
     */
    public function recipe(): BelongsTo
    {
        return $this->belongsTo(RoastRecipe::class, 'roast_recipe_id');
    }

    /**
     * Get the user who created this result.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}