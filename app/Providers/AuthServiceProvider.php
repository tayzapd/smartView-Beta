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

        Gate::define('manage-item',function(User $user,Item $item,Category $category,Shop $shop){

        });

        Gate::define('manage-shop',function(User $user,Shop $shop){

        });

        Gate::define('manage-shop',function(User $user,Shop $shop){

        });

        Gate::define('manage-shop',function(User $owner,User $user){

        });
        //
    }
}
