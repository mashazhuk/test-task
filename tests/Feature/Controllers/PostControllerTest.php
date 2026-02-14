<?php

namespace Tests\Feature\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_it_displays_posts_index_page(): void
    {
        Post::factory()->count(5)->create();

        $response = $this->actingAs($this->user)->get(route('posts.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->component('posts/index')
                ->has('posts.data', 5)
        );
    }

    public function test_it_can_search_posts_by_title(): void
    {
        Post::factory()->create(['title' => 'Laravel Tutorial']);
        Post::factory()->create(['title' => 'React Guide']);
        Post::factory()->create(['title' => 'Vue Basics']);

        $response = $this->actingAs($this->user)
            ->get(route('posts.index', ['search' => 'Laravel']));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->has('posts.data', 1)
                ->where('posts.data.0.title', 'Laravel Tutorial')
        );
    }

    public function test_it_can_search_posts_by_body(): void
    {
        Post::factory()->create(['body' => 'This is about Laravel']);
        Post::factory()->create(['body' => 'This is about React']);

        $response = $this->actingAs($this->user)
            ->get(route('posts.index', ['search' => 'React']));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->has('posts.data', 1)
        );
    }

    public function test_it_can_filter_posts_by_user(): void
    {
        $author = User::factory()->create();
        Post::factory()->count(3)->create(['user_id' => $author->id]);
        Post::factory()->count(2)->create(['user_id' => $this->user->id]);

        $response = $this->actingAs($this->user)
            ->get(route('posts.index', ['user_id' => $author->id]));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->has('posts.data', 3)
        );
    }

    public function test_it_displays_create_post_page(): void
    {
        $response = $this->actingAs($this->user)->get(route('posts.create'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->component('posts/create')
        );
    }

    public function test_it_can_store_a_new_post(): void
    {
        $postData = [
            'title' => 'New Post Title',
            'body' => 'New post body content.',
        ];

        $response = $this->actingAs($this->user)
            ->post(route('posts.store'), $postData);

        $response->assertRedirect(route('posts.index'));
        $this->assertDatabaseHas('posts', [
            'user_id' => $this->user->id,
            'title' => 'New Post Title',
            'body' => 'New post body content.',
        ]);
    }

    public function test_it_validates_required_fields_when_storing(): void
    {
        $response = $this->actingAs($this->user)
            ->post(route('posts.store'), []);

        $response->assertSessionHasErrors(['title', 'body']);
    }

    public function test_it_displays_edit_post_page(): void
    {
        $post = Post::factory()->create();

        $response = $this->actingAs($this->user)->get(route('posts.edit', $post));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->component('posts/edit')
                ->has('post')
        );
    }

    public function test_it_can_update_a_post(): void
    {
        $post = Post::factory()->create([
            'title' => 'Original Title',
            'body' => 'Original Body',
        ]);

        $updateData = [
            'title' => 'Updated Title',
            'body' => 'Updated Body',
        ];

        $response = $this->actingAs($this->user)
            ->put(route('posts.update', $post), $updateData);

        $response->assertRedirect(route('posts.index'));
        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'title' => 'Updated Title',
            'body' => 'Updated Body',
        ]);
    }

    public function test_it_validates_required_fields_when_updating(): void
    {
        $post = Post::factory()->create();

        $response = $this->actingAs($this->user)
            ->put(route('posts.update', $post), [
                'title' => '',
                'body' => '',
            ]);

        $response->assertSessionHasErrors(['title', 'body']);
    }

    public function test_it_can_delete_a_post(): void
    {
        $post = Post::factory()->create();

        $response = $this->actingAs($this->user)
            ->delete(route('posts.destroy', $post));

        $response->assertRedirect(route('posts.index'));
        $this->assertDatabaseMissing('posts', ['id' => $post->id]);
    }

    public function test_guests_cannot_access_posts_pages(): void
    {
        $post = Post::factory()->create();

        $this->get(route('posts.index'))->assertRedirect(route('login'));
        $this->get(route('posts.create'))->assertRedirect(route('login'));
        $this->post(route('posts.store'))->assertRedirect(route('login'));
        $this->get(route('posts.edit', $post))->assertRedirect(route('login'));
        $this->put(route('posts.update', $post))->assertRedirect(route('login'));
        $this->delete(route('posts.destroy', $post))->assertRedirect(route('login'));
    }

    public function test_it_paginates_posts(): void
    {
        Post::factory()->count(20)->create();

        $response = $this->actingAs($this->user)->get(route('posts.index'));

        $response->assertStatus(200);
        $response->assertInertia(
            fn($page) => $page
                ->has('posts.data', 15) // Default pagination is 15
                ->has('posts.links')
                ->where('posts.total', 20)
        );
    }
}
