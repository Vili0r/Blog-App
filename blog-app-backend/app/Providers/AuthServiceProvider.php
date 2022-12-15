<?php

namespace App\Providers;

use App\Models\Permission;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        ResetPassword::createUrlUsing(function ($notifiable, $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });

        if(Schema::hasTable('permissions')){
            $permissions = Permission::with('roles')->get();
            
            foreach($permissions as $permission) {
                Gate::define($permission->name, function($user) use ($permission) {
                    return count(array_intersect(
                        $permission->roles()->pluck('id')->toArray(), 
                        $user->roles()->pluck('id')->toArray())) > 0;
                });
            }
        }
    }
}
