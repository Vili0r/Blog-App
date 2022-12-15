<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $super_admin = Role::create(['name' => 'super admin']);
        $super_admin->permissions()->attach(Permission::pluck('id'));

        $admin = Role::create(['name' => 'administrator']);
        $admin->permissions()->attach(
            Permission::where('name', '!=', 'manage_users')
                ->pluck('id')
        );
        
        $editor = Role::create(['name' => 'editor']);
        $editor->permissions()->attach(
            Permission::where('name', '!=', 'article_delete')
                ->where('name', '!=', 'article_featured')
                ->where('name', '!=', 'manage_users')
                ->pluck('id')
        );
    }
}
