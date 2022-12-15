<?php

namespace App\Models;

use App\Traits\HasAuthor;
use App\Traits\ModelHelper;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    use HasAuthor;
    use ModelHelper;

    protected $fillable =[
        'title',
        'slug',
        'body',
        'published_at',
        'featured',
        'author_id',
        'category_id',
        'image',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Scope a query to only include active users.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return void
     */
    public function scopeFeatured($query)
    {
        $query->where('featured', 1);
    }
    
    /**
     * Scope a query to only include active users.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return void
     */
    public function scopePublished($query)
    {
        $query->whereNotNull('published_at')->where('published_at', '<=', new \DateTime());
    }
}
