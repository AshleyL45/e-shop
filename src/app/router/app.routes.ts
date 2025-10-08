import { Routes } from '@angular/router';
import { helloResolver } from "./resolvers/hello-resolver";
import { authGuard } from "./guards/auth-guard";
import {productsResolver} from "./resolvers/product-resolver";

export const routes: Routes = [
    { path: '',
        title : 'Accueil',
        loadComponent: () => import('../features/home/pages/homePage/home.page') },

    {
        path: 'products',
        title : 'Produits',
        loadComponent: () => import('../features/products/pages/productPage/product.page'),
        resolve: { products: productsResolver }
    },

    {
        path: 'products/:id',
        title: 'Détail du produit',
        loadComponent: () => import('../features/productDetails/pages/product-detail.page'),
    },

    { path: 'setting',
        title: 'Paramètres',
        loadComponent: () => import('../features/home/pages/setting.page') },

    { path: 'about',
        title : 'À propos',
        loadComponent: () => import('../features/home/pages/about.page') },

    { path: 'error',
        title : 'Erreur',
        loadComponent: () => import('../features/error/pages/error.page') },

    {
        path: 'hello',
        title : 'Hello',
        loadComponent: () => import('../features/home/pages/hello.page'),
        resolve: { message: helloResolver }
    },

    {
        path: 'auth',
        children: [
            {
                path: 'register',
                title: 'Inscription',
                loadComponent: () => import('../features/auth/pages/register/register.page'),
            },
            {
                path: 'login',
                title: 'Se connecter',
                loadComponent: () => import('../features/auth/pages/login/login.page'),
            },
        ],
    },


    { path: '**', loadComponent: () => import('../features/error/pages/error.page') }
];
