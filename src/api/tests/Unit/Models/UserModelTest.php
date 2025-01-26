<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

class UserModelTest extends TestCase
{
    use RefreshDatabase;
    /**
     * Test creating user with current params.
     */
    public function test_create_user_with_correct_params(): void
    {
        $user = User::factory()->create();
        $response = User::all();

        $this->assertNotEmpty($response);
        $this->assertEquals(1, $response->count());
        $this->assertEquals($user->name, $response[0]->name);
    }
}
