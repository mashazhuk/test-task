<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->paginate(15);
        return Inertia::render('posts/index', [
            'posts' => $posts,
        ]);
    }
}
