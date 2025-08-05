import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';
import Heading from '@/components/heading';



export default function CreateRoastRecipe() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        duration_minutes: '',
        bean_origin: '',
        roast_level: '',
        temperature: '',
        notes: ''
    });
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.post(route('roast-recipes.store'), formData, {
            onError: (errors) => {
                setErrors(errors as {[key: string]: string});
                setIsSubmitting(false);
            },
            onSuccess: () => {
                setIsSubmitting(false);
            }
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/roast-recipes">
                            <Button variant="outline" size="sm">
                                ← Back to Recipes
                            </Button>
                        </Link>
                        <Heading title="✨ Create New Recipe" />
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Recipe Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Recipe Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                                        errors.name ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                    placeholder="e.g., Ethiopian Light Roast"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Brief description of your roasting approach..."
                                />
                            </div>

                            {/* Duration and Temperature */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="duration_minutes" className="block text-sm font-medium text-gray-700 mb-2">
                                        Duration (minutes) *
                                    </label>
                                    <input
                                        type="number"
                                        id="duration_minutes"
                                        name="duration_minutes"
                                        value={formData.duration_minutes}
                                        onChange={handleChange}
                                        min="1"
                                        max="120"
                                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                                            errors.duration_minutes ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="15"
                                    />
                                    {errors.duration_minutes && <p className="mt-1 text-sm text-red-600">{errors.duration_minutes}</p>}
                                </div>

                                <div>
                                    <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-2">
                                        Temperature (°C)
                                    </label>
                                    <input
                                        type="number"
                                        id="temperature"
                                        name="temperature"
                                        value={formData.temperature}
                                        onChange={handleChange}
                                        min="100"
                                        max="300"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="220"
                                    />
                                    {errors.temperature && <p className="mt-1 text-sm text-red-600">{errors.temperature}</p>}
                                </div>
                            </div>

                            {/* Bean Origin and Roast Level */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="bean_origin" className="block text-sm font-medium text-gray-700 mb-2">
                                        Bean Origin
                                    </label>
                                    <input
                                        type="text"
                                        id="bean_origin"
                                        name="bean_origin"
                                        value={formData.bean_origin}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="e.g., Ethiopia Yirgacheffe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="roast_level" className="block text-sm font-medium text-gray-700 mb-2">
                                        Roast Level
                                    </label>
                                    <select
                                        id="roast_level"
                                        name="roast_level"
                                        value={formData.roast_level}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    >
                                        <option value="">Select level</option>
                                        <option value="light">Light</option>
                                        <option value="medium">Medium</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                    {errors.roast_level && <p className="mt-1 text-sm text-red-600">{errors.roast_level}</p>}
                                </div>
                            </div>

                            {/* Notes */}
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                                    Roasting Notes
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                    placeholder="Detailed roasting process, timing notes, expected outcomes..."
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4 pt-6">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-amber-600 hover:bg-amber-700 flex-1"
                                >
                                    {isSubmitting ? '⏳ Creating...' : '✨ Create Recipe'}
                                </Button>
                                <Link href="/roast-recipes">
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}