import { Component, signal } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { CartPopover } from '../cart-popover/cart-popover';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: 'header.html',
    styleUrls: ['header.scss'],
    imports: [CommonModule, CartPopover, RouterLinkActive, RouterLink]
})
export class Header {
    items = signal([
        { label: 'Accueil', icon: 'pi pi-home', path: '/' },
        {
            label: 'Produits',
            icon: 'pi pi-shopping-cart',
            children: [
                { label: 'Tous les produits', path: '/products' },
                { label: 'Produit 1', path: '/products/1' }
            ]
        },
        { label: 'À Propos', icon: 'pi pi-info-circle', path: '/about' },
        { label: 'Paramètres', icon: 'pi pi-cog', path: '/setting' },
        { label: 'Admin', icon: 'pi pi-shield', path: '/admin' },
        { label: 'Panier', icon: 'pi pi-cart-arrow-down', path: '/cart' },
        { label: 'Erreur', icon: 'pi pi-times-circle', path: '/error' },
        {
            label: 'Auth',
            icon: 'pi pi-user',
            children: [
                { label: 'Connexion', path: '/auth/login' },
                { label: 'Inscription', path: '/auth/register' }
            ]
        },
        {
            label: 'Profile',
            icon: 'pi pi-user',
            children: [
                { label: 'Mon Compte', path: '/profile/account' },
                { label: 'Inscription', path: '/profile/setting' }
            ]
        }
    ]);

    private openDropdown = signal<string | null>(null);

    constructor(private router: Router) {}

    toggleDropdown(name: string) {
        this.openDropdown.set(this.openDropdown() === name ? null : name);
    }

    closeDropdown() {
        this.openDropdown.set(null);
    }

    activeDropdown() {
        return this.openDropdown();
    }
}
