<?php

namespace Tests\Feature\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return void
     */
    public function test_get_index_fails(): void
    {
        $response = $this->getJson('/api/users');

        $response->assertStatus(401);
        $response = $response->json();

        $this->assertEquals("Unauthenticated.", $response['message']);
    }

    /**
     * @return void
     */
    public function test_get_index_success(): void
    {
        $this->login();

        $response = $this->getJson('/api/users');

        $response->assertStatus(200);
    }

    /**
     * @return void
     */
    public function test_create_user_success_with_correct_params(): void
    {
        $attributes = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ];
        $response = $this->postJson('/api/user/register', $attributes);

        $response->assertStatus(200);

        $user = User::all();
        $this->assertEquals(1, $user->count());
        $this->assertEquals($attributes['name'], $user[0]->name);
        $this->assertEquals($attributes['email'], $user[0]->email);
    }

    /**
     * @return void
     */
    public function test_create_user_fails_without_username(): void
    {
        $attributes = [
            'name' => '',
            'email' => 'test@example.com',
            'password' => 'password',
        ];
        $response = $this->postJson('/api/user/register', $attributes);

        $response->assertStatus(404);

        $response = $response->json();

        $this->assertEquals(false, $response['success']);
        $this->assertEquals('Validation Error.', $response['message']);
        $this->assertEquals('The name field is required.', $response['data'][0]['name'][0]);
    }

    /**
     * @return void
     */
    public function test_create_user_fails_without_email(): void
    {
        $attributes = [
            'name' => 'TestUser',
            'email' => '',
            'password' => 'password',
        ];
        $response = $this->postJson('/api/user/register', $attributes);

        $response->assertStatus(404);

        $response = $response->json();

        $this->assertEquals(false, $response['success']);
        $this->assertEquals('Validation Error.', $response['message']);
        $this->assertEquals('The email field is required.', $response['data'][0]['email'][0]);
    }

    /**
     * @return void
     */
    public function test_create_user_fails_without_password(): void
    {
        $attributes = [
            'name' => 'TestUser',
            'email' => 'test@example.com',
            'password' => '',
        ];
        $response = $this->postJson('/api/user/register', $attributes);

        $response = $response->json();

        $this->assertEquals(false, $response['success']);
        $this->assertEquals('Validation Error.', $response['message']);
        $this->assertEquals('The password field is required.', $response['data'][0]['password'][0]);
    }

    /**
     * @return void
     */
    public function test_create_user_fails_with_duplicated_email(): void
    {
        $attributes = [
            'name' => 'TestUser',
            'email' => 'test@example.com',
            'password' => 'password',
        ];
        $this->postJson('/api/user/register', $attributes);

        $response = $this->postJson('/api/user/register', $attributes);
        $response->assertStatus(404);

        $response = $response->json();

        $this->assertEquals(false, $response['success']);
        $this->assertEquals('Validation Error.', $response['message']);
        $this->assertEquals('The email has already been taken.', $response['data'][0]['email'][0]);
    }

    /**
     * @return void
     */
    private function login(): void
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);
    }
}