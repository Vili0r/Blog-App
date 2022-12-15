<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('article_view');
        $articles = Article::paginate(10);
        
        return ArticleResource::collection($articles);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreArticleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('article_create');

        $request->validate([
            'image' => ['required', 'image'],
            'title' => ['required', 'min:3', 'max:30'],
            'body' => ['required', 'min:3'],
            'published_at' => ['required'],
            'category_id' => ['required'],
        ]);       

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.'.$extension;
            $file->move('uploads/articles/', $filename);

            $article = Article::create([
                'title' => $request->title,
                'body' => $request->body,
                'published_at' => $request->published_at,
                'category_id' => $request->category_id,
                'slug' => Str::slug($request->input('title')),
                'author_id' => auth()->id(),
                'image' => 'uploads/articles/'.$filename,
            ]);
        }
        
        return new ArticleResource($article);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        $this->authorize('article_view');
        return new ArticleResource($article);
    }

     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article)
    {
        $this->authorize('article_update');

        $image = $article->image;

        $request->validate([
            'image' => ['required', 'image'],
            'title' => ['required', 'min:3', 'max:30'],
            'body' => ['required', 'min:3'],
            'published_at' => ['required'],
            'category_id' => ['required'],
        ]);

        if ($request->hasFile('image')) {
            Storage::delete($image);
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.'.$extension;
            $file->move('uploads/articles/', $filename);
            $image = 'uploads/articles/'.$filename;
        }
        
        $article->update([
            'title' => $request->title,
            'body' => $request->body,
            'published_at' => $request->published_at,
            'category_id' => $request->category_id,
            'slug' => Str::slug($request->input('title')),
            'author_id' => auth()->id(),
            'image' => $image,
        ]);

        return new ArticleResource($article);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        $this->authorize('article_delete');

        Storage::delete($article->image);

        $article->delete();

        return response()->noContent();
    }

    public function featured(Article $article)
    {
        $isFeatured = $article->featured;

        $article->update([
            'featured' => !$isFeatured
        ]);

        return response()->json([
            'success' => 200
        ]);
    }
}
