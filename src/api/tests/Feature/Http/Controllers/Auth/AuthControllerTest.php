<?php

namespace Tests\Feature\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use function PHPUnit\Framework\assertEquals;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;
    
    /**
     * @return void
     * CSRFトークンを正常に取得できる
     */
    public function test_csef_token_can_be_generated(): void
    {
        $response = $this->get('/sanctum/csrf-cookie');
        
        $response->assertStatus(204);
        $this->assertNotEmpty($response->getCookie('XSRF-TOKEN'));
    }

    /**
     * @return void
     * テスト環境でのCSRFトークンの検証は無効化されている
     * 正常にログインできる
     */
    public function test_user_can_login_with_valid_password(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(302);
    
        $response = $this->get('/api/loggedin');
        $response->assertStatus(200);
        $this->assertEquals(true, $response->json()['success']);
        $this->assertEquals("User Already Logged In", $response->json()['message']);
        $this->assertAuthenticated();
    }

    /**
     * @return void
     * テスト環境でのCSRFトークンの検証は無効化されている
     * パスワードが間違っている場合、ログインできない
     */
    public function test_user_can_not_login_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $response = $this->postJson('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(401);
        
        $parsedResponse = $response->json();
        $this->assertEquals(false, $parsedResponse['success']);
        $this->assertEquals('Login Failed', $parsedResponse['message']);
        $this->assertEquals('Unauthorized', $parsedResponse['data']['error']);
    }

    /**
     * @return void
     * テスト環境でのCSRFトークンの検証は無効化されている
     * ログイン後にログインユーザーを取得できる
     */
    public function test_user_can_get_loggedin_user(): void
    {
        $user = User::factory()->create();

        $loginResponse = $this->postJson('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $loginResponse->assertStatus(302);

        $currentUser = $this->get('/api/current_user');
        $currentUser->assertStatus(200);

        $parsedCurrentUser = $currentUser->json();
        $this->assertEquals($user->name, $parsedCurrentUser['name']);
        $this->assertEquals($user->email, $parsedCurrentUser['email']);
        $this->assertEquals($user->id, $parsedCurrentUser['id']);
    }

    /**
     * @return void
     * テスト環境でのCSRFトークンの検証は無効化されている
     * ログアウトできる
     */
    public function test_user_can_logout(): void
    {
        $user = User::factory()->create();

        $this->postJson('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $logoutResponse = $this->postJson('/logout');
        $logoutResponse->assertStatus(200);
        
        $parsedLogoutResponse = $logoutResponse->json();
        $this->assertEquals(true, $parsedLogoutResponse['success']);
        $this->assertEquals('User Logged Out', $parsedLogoutResponse['data']['message']);
    }
}
