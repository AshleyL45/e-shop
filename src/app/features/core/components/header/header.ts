import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from "primeng/menubar";
import { InputTextModule } from "primeng/inputtext";
import {AvatarModule} from "primeng/avatar";

import {PopoverModule} from "@coreui/angular";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {Popover} from "primeng/popover";
import {CartPopoverComponent} from "../cart-popover/cart-popover";


@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: 'header.html',
    imports: [MenubarModule, ButtonModule, RippleModule, PopoverModule, InputTextModule, AvatarModule, CartPopoverComponent],
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
