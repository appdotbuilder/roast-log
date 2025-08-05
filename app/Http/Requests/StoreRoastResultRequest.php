<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoastResultRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'roast_recipe_id' => 'required|exists:roast_recipes,id',
            'roast_date' => 'required|date|before_or_equal:today',
            'taste_notes' => 'nullable|string',
            'rating' => 'required|integer|min:1|max:5',
            'batch_size' => 'nullable|integer|min:1|max:10000',
            'observations' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'roast_recipe_id.required' => 'Recipe selection is required.',
            'roast_recipe_id.exists' => 'Selected recipe does not exist.',
            'roast_date.required' => 'Roast date is required.',
            'roast_date.before_or_equal' => 'Roast date cannot be in the future.',
            'rating.required' => 'Rating is required.',
            'rating.min' => 'Rating must be at least 1 star.',
            'rating.max' => 'Rating cannot exceed 5 stars.',
            'batch_size.min' => 'Batch size must be at least 1 gram.',
            'batch_size.max' => 'Batch size cannot exceed 10,000 grams.',
        ];
    }
}