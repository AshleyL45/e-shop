import { Injectable } from '@angular/core';
import { CartService, CartItem } from './cart.service';
import { CartRules } from './cart.rules';
import { CartApi } from './cart.api';
import { NotificationService } from '../../../shared/services/notification.service';

@Injectable({ providedIn: 'root' })
export class CartFacade {
    constructor(
        private cartService: CartService,
        private cartApi: CartApi,
        private notify: NotificationService
    ) {}

    add(item: Partial<CartItem>): void {
        CartRules.validateAdd(item, this.cartService.total());
        this.cartService.addToCart(item as CartItem); // ✅ cast ici
        this.cartApi.persistAdd(item);
        this.notify.success(`${item.name} a été ajouté au panier`);
    }

    updateQuantity(id: number, qty: number): void {
        CartRules.validateUpdate(id, qty, undefined, this.cartService.items());
        this.cartService.updateQuantity(id, qty);
        this.cartApi.persistUpdate(id, qty);
        this.notify.info(`Quantité du produit #${id} mise à jour (${qty})`);
    }

    remove(id: number): void {
        CartRules.validateRemove(id, this.cartService.items());
        this.cartService.removeFromCart(id);
        this.cartApi.persistRemove(id);
        this.notify.warn(`Produit #${id} supprimé du panier`);
    }

    clear(): void {
        CartRules.validateClear();
        this.cartService.clearCart();
        this.cartApi.persistClear();
        this.notify.warn(`Panier vidé`);
    }

    checkout(): void {
        CartRules.validateCheckout(this.cartService.items());
        this.cartService.checkout();
        this.cartApi.persistCheckout();
        this.notify.success(`Commande validée ✅`);
    }
}
