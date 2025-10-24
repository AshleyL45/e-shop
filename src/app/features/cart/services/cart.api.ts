import { Injectable } from '@angular/core';
import { CartItem } from './cart.service';
import { BaseApi } from '../../../shared/services/base.api';

@Injectable({ providedIn: 'root' })
export class CartApi extends BaseApi {
    protected override readonly BASE_URL = 'https://api.monsite.com/cart';

    async persistAdd(item: Partial<CartItem>): Promise<void> {
        console.log('[API] Produit ajouté :', item);
        await this.post<void>('/', item);
    }

    async persistUpdate(id: number, qty: number): Promise<void> {
        console.log(`[API] Quantité du produit #${id} mise à jour : ${qty}`);
        await this.put<void>(`/${id}`, { quantity: qty });
    }

    async persistRemove(id: number): Promise<void> {
        console.log(`[API] Produit supprimé : #${id}`);
        await this.delete<void>(`/${id}`);
    }

    async persistClear(): Promise<void> {
        console.log('[API] Panier vidé');
        await this.delete<void>('/clear');
    }

    async persistCheckout(): Promise<void> {
        console.log('[API] Checkout validé');
        await this.post<void>('/checkout', {});
    }
}
