<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ArticleCommentController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\FrontendController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:sanctum']], function() {
  
    //Featured article
    Route::put('article-featured/{article}', [ArticleController::class, 'featured']);

    //Articles
    Route::apiResource('articles', ArticleController::class);
    
    //Categories
    Route::apiResource('categories', CategoryController::class);
    
    //Author
    Route::get('authors/{user}', [AuthorController::class, 'show'])->name('authors');
    
    //User
    Route::get('user', UserController::class);

    //Get Comments
    Route::get('comments', [CommentController::class, 'index']);
    
    //Comments
    Route::apiResource('articles.comments', ArticleCommentController::class)->only(['update', 'destroy']);

    //Admin Controller
    Route::get('total-users', [AdminController::class, 'users']);
    Route::get('total-articles', [AdminController::class, 'articles']);
    Route::get('total-comments', [AdminController::class, 'comments']);
});

//Front End API Endpoints

Route::prefix('front-end')->group(function () {

    //Get 5 Latest Articles
    Route::get('articles-widget', [FrontendController::class, 'articleWidget']);

    //Get All Articles
    Route::get('articles', [FrontendController::class, 'articles']);

    //Get single article
    Route::get('articles-show/{article:slug}', [FrontendController::class, 'articleShow']);
    
    //Get featured articles
    Route::get('articles-featured', [FrontendController::class, 'articleFeatured']);

    //Get All Categories
    Route::get('categories', [FrontendController::class, 'categories']);

    //Get Single Category
    Route::get('categories-show/{category:slug}', [FrontendController::class, 'categoryShow']);

    //Comment
    Route::apiResource('articles.comments', ArticleCommentController::class)->only(['store', 'index']);
});
