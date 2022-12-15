<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Client\Request;

class AdminController extends Controller
{
    public function users()
    {
        $users = User::count();

        return response()->json([
            'status' => 200,
            'users' => $users
        ]);
    }

    public function articles()
    {
        $articles = Article::count();

        return response()->json([
            'status' => 200,
            'articles' => $articles
        ]);
    }

    public function comments()
    {
        $comments = Comment::count();

        return response()->json([
            'status' => 200,
            'comments' => $comments
        ]);
    }
}
