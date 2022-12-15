<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $super_admin = User::factory()->create(['email' => 'superadmin@superadmin.com']);
        $super_admin->roles()->attach(1);
        
        $admin = User::factory()->create(['email' => 'admin@admin.com']);
        $admin->roles()->attach(2);
        
        $editor = User::factory()->create();
        $editor->roles()->attach(3);
    }
}
