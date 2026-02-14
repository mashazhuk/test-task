<?php

namespace Tests\Unit\Models;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_belongs_to_a_user(): void
    {
        $user = User::factory()->create();
        $post = Post::factory()->create(['user_id' => $user->id]);

        $this->assertInstanceOf(User::class, $post->user);
        $this->assertEquals($user->id, $post->user->id);
    }

    public function test_it_has_fillable_attributes(): void
    {
        $post = new Post();
        $fillable = $post->getFillable();

        $this->assertContains('user_id', $fillable);
        $this->assertContains('title', $fillable);
        $this->assertContains('body', $fillable);
    }

    public function test_it_can_be_created_with_valid_data(): void
    {
        $user = User::factory()->create();

        $post = Post::create([
            'user_id' => $user->id,
            'title' => 'Test Post',
            'body' => 'This is a test post body.',
        ]);

        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'user_id' => $user->id,
            'title' => 'Test Post',
            'body' => 'This is a test post body.',
        ]);
    }

    public function test_it_can_be_updated(): void
    {
        $post = Post::factory()->create([
            'title' => 'Original Title',
            'body' => 'Original Body',
        ]);

        $post->update([
            'title' => 'Updated Title',
            'body' => 'Updated Body',
        ]);

        $this->assertEquals('Updated Title', $post->fresh()->title);
        $this->assertEquals('Updated Body', $post->fresh()->body);
    }

    public function test_it_can_be_deleted(): void
    {
        $post = Post::factory()->create();
        $postId = $post->id;

        $post->delete();

        $this->assertDatabaseMissing('posts', ['id' => $postId]);
    }
}
