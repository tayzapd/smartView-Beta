<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Category;
use App\Models\User;
use App\Models\Item;
use App\Models\Shop;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
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



        Gate::define('admin-auth', function (User $user) {
            return $user->hasRole('admin') && $user->shop_id == 1;
        });

        Gate::define('shop-auth', function (User $user,Shop $shop) {
            return $user->hasRole('shop_admin');
        });
        
    }
}
