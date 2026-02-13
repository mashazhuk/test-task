<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->latest()->paginate(15);
        return Inertia::render('posts/index', [
            'posts' => $posts,
        ]);
    }

    public function create()
    {
        return Inertia::render('posts/create');
    }

    public function store(PostStoreRequest $request)
    {
        $validated = $request->validated();
        $request->user()->posts()->create($validated);

        return to_route('posts.index');
    }

    public function edit(Post $post)
    {
        return Inertia::render('posts/edit', [
            'post' => $post,
        ]);
    }

    public function update(PostUpdateRequest $request, Post $post)
    {
        $validated = $request->validated();

        $post->update($validated);

        return to_route('posts.index');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return to_route('posts.index');
    }
}
