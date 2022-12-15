<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreArticleCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Article;
use App\Models\Comment;

class ArticleCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Article $article)
    {
        $comment = $article->comments()->with('article')->approved()->get();
        
        return CommentResource::collection($comment);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreArticleCommentRequest $request, Article $article)
    {
        $comment = $article->comments()->create($request->validated());

        return new CommentResource($comment);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ArticleComment  $articleComment
     * @return \Illuminate\Http\Response
     */
    public function update(Article $article, Comment $comment)
    {
        $article->comments()->update([
            'approved' => true
        ]);

        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ArticleComment  $articleComment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article, Comment $comment)
    {
        $comment->delete();

        return response()->noContent();
    }
}
