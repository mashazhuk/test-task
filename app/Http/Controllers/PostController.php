<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('user');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('body', 'like', "%{$search}%");
            });
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->input('user_id'));
        }

        $posts = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('posts/index', [
            'posts' => $posts,
            'filters' => $request->only(['search', 'user_id']),
            'users' => \App\Models\User::select('id', 'name')->orderBy('name')->get(),
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
