<?php

namespace App\Traits;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasAuthor
{
    public function author(): User
    {
        return $this->authorRealtion;
    }
    
    public function authorRealtion(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function isAuthoredBy(User $user): bool 
    {
        return $this->author()->matches($user);
    }

    public function authoredBy(User $author)
    {
        return $this->authorRealtion()->associate($author);
    }
}