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
}
