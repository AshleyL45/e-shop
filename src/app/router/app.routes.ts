import { Routes } from '@angular/router';
import { helloResolver } from "./resolvers/hello-resolver";
import { authGuard } from "./guards/auth-guard";
import {productsResolver} from "./guards/product-resolver";

export const routes: Routes = [
    { path: '', loadComponent: () => import('../features/home/pages/homePage/home.page') },

    {
        path: 'products',
        loadComponent: () => import('../features/products/pages/productPage/product.page'),
        resolve: { products: productsResolver }
    },

    {
        path: 'products/:id',
        loadComponent: () => import('../features/products/pages/product-detail.page').then(m => m.default)
    },


    { path: 'setting',
        loadComponent: () => import('../features/home/pages/setting.page') },

    { path: 'about',
        loadComponent: () => import('../features/home/pages/about.page') },

    { path: 'error',
        loadComponent: () => import('../features/error/pages/error.page') },

    {
        path: 'hello',
        loadComponent: () => import('../features/home/pages/hello.page'),
        resolve: { message: helloResolver }
    },

    {
        path: 'auth',
        children: [
            { path: 'register', loadComponent: () => import('../features/auth/pages/register/register.page').then(c => c.default) },
            { path: 'login', loadComponent: () => import('../features/auth/pages/login/login.page').then(c => c.default) },
        ],
    },

    { path: '**', loadComponent: () => import('../features/error/pages/error.page') }
];
