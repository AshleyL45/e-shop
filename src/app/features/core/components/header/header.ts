import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from "primeng/menubar";
import { InputTextModule } from "primeng/inputtext";
import {Avatar} from "primeng/avatar";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.html',
    imports: [MenubarModule, InputTextModule, Avatar],
    styleUrls: ['./header.scss']
})
export class Header {
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            { label: 'Accueil', icon: 'pi pi-home', routerLink: '/' },
            { label: 'Hello', icon: 'pi pi-smile', routerLink: '/hello' },
            {
                label: 'Produits', icon: 'pi pi-shopping-cart',
                items: [
                    { label: 'Tous les produits', routerLink: '/products' },
                    { label: 'Produit 1', routerLink: ['/products', 1] }
                ]
            },
            { label: 'À Propos', icon: 'pi pi-info-user', routerLink: '/about' },
            { label: 'Paramètres', icon: 'pi pi-cog', routerLink: '/setting' },
            { label: 'Admin', icon: 'pi pi-shield', routerLink: '/admin' },
            { label: 'Erreur', icon: 'pi pi-times-circle', routerLink: '/error' },
            {
                label: 'Auth', icon: 'pi pi-user',
                items: [
                    { label: 'Register', routerLink: '/auth/register' },
                    { label: 'Login', routerLink: ['/auth/login'] }
                ]
            }
        ];
    }
}
