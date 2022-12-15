<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::create(['name' => 'article_view']);
        Permission::create(['name' => 'article_create']);
        Permission::create(['name' => 'article_update']);
        Permission::create(['name' => 'article_delete']);
        Permission::create(['name' => 'article_featured']);
        Permission::create(['name' => 'manage_users']);
    }
}
