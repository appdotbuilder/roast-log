<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRoastRecipeRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration_minutes' => 'required|integer|min:1|max:120',
            'bean_origin' => 'nullable|string|max:255',
            'roast_level' => 'nullable|in:light,medium,dark',
            'temperature' => 'nullable|integer|min:100|max:300',
            'notes' => 'nullable|string',
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
            'name.required' => 'Recipe name is required.',
            'duration_minutes.required' => 'Roasting duration is required.',
            'duration_minutes.min' => 'Duration must be at least 1 minute.',
            'duration_minutes.max' => 'Duration cannot exceed 120 minutes.',
            'temperature.min' => 'Temperature must be at least 100°C.',
            'temperature.max' => 'Temperature cannot exceed 300°C.',
            'roast_level.in' => 'Roast level must be light, medium, or dark.',
        ];
    }
}