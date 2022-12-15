<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $title = $this->faker->sentence();

        return [
            'title' => $title,
            'image' => $title,
            'slug' => Str::slug($title),
            'body' => $this->faker->paragraph(),
            'published_at' => now(),
            'featured' => false,
            'author_id' => rand(1, 3),
            'category_id' => rand(1, 5),
        ];
    }
}
