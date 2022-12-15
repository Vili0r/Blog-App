<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\CategoryResource;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function articles()
    {
        $article = Article::published()->get();

        return ArticleResource::collection($article);
    }
    
    public function articleShow(Article $article)
    {
        return new ArticleResource($article);
    }

    public function articleWidget()
    {
        $articles = Article::published()->latest()->take(5)->get();

        return ArticleResource::collection($articles);
    }
    
    public function articleFeatured()
    {
        $articles = Article::featured()->latest()->get();

        return ArticleResource::collection($articles);
    }

    public function categories()
    {
        return CategoryResource::collection(Category::all());
    }

    public function categoryShow(Category $category)
    {
        return new CategoryResource($category);
    }
}
